import importlib.util
from pathlib import Path
import unittest


REPO_ROOT = Path(__file__).resolve().parents[1]
MODULE_PATH = REPO_ROOT / 'scripts' / 'build_shortcuts.py'
INSTALLED_SERVER_SCRIPT = Path('/Users/cerebra/Documents/GitHub/taste-library/scripts/taste-library-server.sh')


def load_builder():
    spec = importlib.util.spec_from_file_location('build_shortcuts', MODULE_PATH)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


class ShortcutWorkflowTests(unittest.TestCase):
    def setUp(self):
        self.builder = load_builder()

    def action_for(self, command):
        workflow = self.builder.workflow_for(command)
        self.assertEqual(len(workflow['WFWorkflowActions']), 1)
        return workflow['WFWorkflowActions'][0]

    def test_open_shortcut_runs_start_and_notifies(self):
        action = self.action_for('start')
        self.assertEqual(action['WFWorkflowActionIdentifier'], 'is.workflow.actions.runshellscript')
        params = action['WFWorkflowActionParameters']
        self.assertEqual(params['WFShell'], '/bin/zsh')
        self.assertIn(str(INSTALLED_SERVER_SCRIPT), params['WFScript'])
        self.assertIn(' start ', params['WFScript'])
        self.assertIn('display notification', params['WFScript'])

    def test_stop_shortcut_runs_stop_and_notifies(self):
        action = self.action_for('stop')
        params = action['WFWorkflowActionParameters']
        self.assertIn(' stop ', params['WFScript'])
        self.assertIn('display notification', params['WFScript'])

    def test_workflows_have_deterministic_distinct_uuids(self):
        start_one = self.action_for('start')['WFWorkflowActionParameters']['UUID']
        start_two = self.action_for('start')['WFWorkflowActionParameters']['UUID']
        stop_uuid = self.action_for('stop')['WFWorkflowActionParameters']['UUID']
        self.assertEqual(start_one, start_two)
        self.assertNotEqual(start_one, stop_uuid)

    def test_unknown_command_is_rejected(self):
        with self.assertRaisesRegex(ValueError, 'start or stop'):
            self.builder.workflow_for('restart')


if __name__ == '__main__':
    unittest.main()
