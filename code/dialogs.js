export function showDialog(message = "", delay = 2) {
  console.log("Dialogue: " + message + ` ${delay}s`)
  // Text bubble
  let textbox = add([
    rect(width() - 200, 80, { radius: 32 }),
    origin("center"),
    pos(center().x, height() - 60),
    outline(2),
    area(),
    color(0, 0, 0),
    opacity(0.25),
    fixed(),
    "dialogs"
  ])

  // Text
  let txt = add([
    text(message, { size: 32, width: width() - 230 }),
    pos(textbox.pos),
    origin("center"),
    fixed(),
    "dialogs"
  ])

  textbox.onClick(() => {
    destroyAll("dialogs")
  })

  wait(delay, () => {
    destroyAll("dialogs")
  })
}