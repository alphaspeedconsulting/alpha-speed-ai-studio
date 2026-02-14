# Troubleshooting Slash Commands

If slash commands aren't appearing in Claude Code or Cursor, follow these steps:

## ✅ Verification Checklist

### For Cursor
1. **Cursor Version**: Must be Cursor 2.2+ (check: Help > About Cursor)
2. **Directory**: Commands must be in `.cursor/commands/` (not `.cursor/prompts/`)
3. **File Format**: Each command is a `.md` file (e.g., `production-fix.md`)
4. **File Names**: Use kebab-case (e.g., `production-fix`, not `production_fix`)
5. **Restart Required**: Restart Cursor after adding/modifying commands

### For Claude Code
1. **Directory**: Commands must be in `.claude/commands/`
2. **File Format**: Each command is a `.md` file (e.g., `production-fix.md`)
3. **File Names**: Use kebab-case (e.g., `production-fix`, not `production_fix`)

## 🔍 Current Setup

Commands are located at:
```
.claude/commands/    # For Claude Code
.cursor/commands/    # For Cursor
```

Both directories contain identical commands for parity.

## 🧪 Verify Setup

Try typing `/production-fix` in your editor chat. If it works, the setup is correct.

## 🚨 Common Issues

### Issue: "Create Command" button appears (Cursor)
**Solution**:
- Restart Cursor completely (quit and reopen)
- Verify files are in `.cursor/commands/` (not `.cursor/prompts/`)
- Check Cursor version is 2.2+

### Issue: Commands don't autocomplete
**Solution**:
- Type the full command: `/production-fix` (don't wait for autocomplete)
- Commands should work even without autocomplete
- Try `/production-fix` to verify setup

### Issue: Command not found
**Solution**:
- Verify file exists: `.cursor/commands/[command-name].md` or `.claude/commands/[command-name].md`
- Check file name matches exactly (case-sensitive)
- Restart your editor

## 📝 Command Format

Each command file should contain:
```markdown
# Command Name

Description or instructions.

CONTEXT:
- Repo: {{repo}}
- Files: {{files}}

ACTION:
What the command should do.
```

For Claude Code, use `$ARGUMENTS` instead of `{{files}}`.

## 🔄 Next Steps

1. **Restart your editor** (most important!)
2. Try typing `/production-fix` in chat
3. If it works, all commands are ready to use
4. If still not working, check editor version/configuration

## Maintaining Parity

Both `.claude/commands/` and `.cursor/commands/` should contain the same commands.
When adding a new command, add it to both directories.
