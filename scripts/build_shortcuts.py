#!/usr/bin/env python3
"""Build and locally sign Taste Library Apple Shortcut files."""

import plistlib
from pathlib import Path
import shlex
import subprocess
import tempfile
import uuid


REPO_ROOT = Path(__file__).resolve().parents[1]
SOURCE_SERVER_SCRIPT = REPO_ROOT / 'scripts' / 'taste-library-server.sh'
INSTALLED_SERVER_SCRIPT = Path('/Users/cerebra/Documents/GitHub/taste-library/scripts/taste-library-server.sh')
OUTPUT_DIR = REPO_ROOT / 'shortcuts'
SHORTCUTS_BIN = Path('/usr/bin/shortcuts')
ACTION_NAMESPACE = uuid.UUID('cd989a12-480a-45e1-8b0f-2d37a390c7ed')

SHORTCUT_NAMES = {
    'start': 'Open Taste Library',
    'stop': 'Stop Taste Library',
}


def embedded_shell(command):
    script = shlex.quote(str(INSTALLED_SERVER_SCRIPT))
    return '\n'.join([
        f'RESULT=$({script} {command} 2>&1)',
        'STATUS=$?',
        "/usr/bin/osascript -e 'on run argv' "
        "-e 'display notification (item 1 of argv) with title \"Taste Library\"' "
        "-e 'end run' -- \"$RESULT\"",
        'exit "$STATUS"',
    ])


def workflow_for(command):
    if command not in SHORTCUT_NAMES:
        raise ValueError('command must be start or stop')

    action_uuid = str(uuid.uuid5(ACTION_NAMESPACE, command)).upper()
    return {
        'WFWorkflowClientRelease': '4.0',
        'WFWorkflowClientVersion': '4000',
        'WFWorkflowMinimumClientVersion': 900,
        'WFWorkflowMinimumClientVersionString': '900',
        'WFWorkflowIcon': {
            'WFWorkflowIconGlyphNumber': 59446,
            'WFWorkflowIconStartColor': 4282601983,
        },
        'WFWorkflowImportQuestions': [],
        'WFWorkflowInputContentItemClasses': ['WFGenericFileContentItem'],
        'WFWorkflowOutputContentItemClasses': [],
        'WFWorkflowTypes': [],
        'WFWorkflowActions': [
            {
                'WFWorkflowActionIdentifier': 'is.workflow.actions.runshellscript',
                'WFWorkflowActionParameters': {
                    'UUID': action_uuid,
                    'WFShell': '/bin/zsh',
                    'WFScript': embedded_shell(command),
                    'WFUseShellEnvironment': True,
                },
            }
        ],
    }


def build_shortcut(command):
    name = SHORTCUT_NAMES[command]
    output = OUTPUT_DIR / f'{name}.shortcut'
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    with tempfile.TemporaryDirectory(prefix='taste-library-shortcut-') as temp_dir:
        unsigned = Path(temp_dir) / f'{name}.shortcut'
        with unsigned.open('wb') as handle:
            plistlib.dump(workflow_for(command), handle, fmt=plistlib.FMT_BINARY, sort_keys=True)

        subprocess.run(
            [
                str(SHORTCUTS_BIN),
                'sign',
                '--mode',
                'people-who-know-me',
                '--input',
                str(unsigned),
                '--output',
                str(output),
            ],
            check=True,
        )
    return output


def main():
    if not SHORTCUTS_BIN.exists():
        raise SystemExit('Apple Shortcuts CLI was not found at /usr/bin/shortcuts')
    if not SOURCE_SERVER_SCRIPT.exists():
        raise SystemExit(f'Server lifecycle script was not found: {SOURCE_SERVER_SCRIPT}')

    for command in ('start', 'stop'):
        output = build_shortcut(command)
        print(f'Built {output}')


if __name__ == '__main__':
    main()
