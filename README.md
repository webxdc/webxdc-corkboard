# Corkboard

Sample app demonstrating CRUD (create, read, update, delete) operations.

Each participant can modify items in their own 'board' or list; this is a simple hack to avoid overwriting conflicts when used in groups. Each update brings the respective board to the top so that other participants know what changed.

For CRUD operations with Automerge, see [Checklist](https://github.com/webxdc/webxdc-checklist).

## Demo

### Setup

Copy `webxdc.js` from [Hello](https://github.com/webxdc/hello) into this folder.

### Run

It's possible to simply open `index.html` in your web browser, but the collaborative aspect is better accessed over a server.

If your computer has php installed, you can try:

```
php -S localhost:3000
```

1. Open [http://localhost:3000](http://localhost:3000) in your web browser
2. Click 'Add Peer' to open as many peers as you like
3. Type a message and press 'Send' to see the update in each peer. (For Safari you might need to check the setting under Develop > Disable Local File Restrictions.)
