import type { PlaygroundPlugin, PluginUtils } from "./vendor/playground"

const makePlugin = (utils: PluginUtils) => {
  const customPlugin: PlaygroundPlugin = {
    id: 'example',
    displayName: 'Dev Example',
    didMount: (sandbox, container) => {
      console.log('Showing new plugin')

      const p = (str: string) => utils.el(str, "p", container);
      const h4 = (str: string) => utils.el(str, "h4", container);

      h4("Example Plugin")

      p("This plugin has a button which changes the text in the editor, click below to test it.")

      const startButton = document.createElement('input')
      startButton.type = 'button'
      startButton.value = 'Change the code in the editor'
      container.appendChild(startButton)

      startButton.onclick = () => {
        sandbox.setText('// You clicked the button!')
      }
    },

    // This is called occasionally as text changes in monaco,
    // it does not directly map 1 keyup to once run of the function
    // because it is intentionally called at most once every 0.3 seconds
    // and then will always run at the end.
    modelChangedDebounce: async (_sandbox, _model) => {
      // Do some work with the new text
    },

    // Gives you a chance to remove anything set up,
    // the container itself if wiped of children after this.
    didUnmount: () => {
      console.log('Removing plugin')
    },
  }

  return customPlugin
}

export default makePlugin
