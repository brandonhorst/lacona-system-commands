/** @jsx createElement */

import _ from 'lodash'
import { createElement } from 'elliptical'
import { Command } from 'lacona-phrases'
import { shutdown, restart, logOut, sleep, lock, turnOffDisplay, turnOnScreensaver, emptyTrash } from 'lacona-api'

function execute (result) {
  if (result.verb === 'restart') {
    restart()
  } else if (result.verb === 'shutdown') {
    shutdown()
  } else if (result.verb === 'sleep') {
    sleep()
  } else if (result.verb === 'lock') {
    lock()
  } else if (result.verb === 'log out') {
    logOut()
  } else if (result.verb === 'empty-trash') {
    emptyTrash()
  } else if (result.verb === 'screensaver') {
    turnOnScreensaver()
  } else if (result.verb === 'display-off') {
    turnOffDisplay()
  }
}

export const SystemCommands = {
  extends: [Command],
  
  execute,

  filterResult (result, {config}) {
    return (
      (result.verb === 'restart' && config.enableRestart) ||
      (result.verb === 'shutdown' && config.enableShutdown) ||
      (result.verb === 'sleep' && config.enableSleep) ||
      (result.verb === 'lock' && config.enableLock) ||
      (result.verb === 'log out' && config.enableLogOut) ||
      (result.verb === 'empty-trash' && config.enableEmptyTrash) ||
      (result.verb === 'screensaver' && config.enableScreensaver) ||
      (result.verb === 'display-off' && config.enableTurnOffDisplay)
    )
  },

  describe () {
    return (
      <choice>
        <sequence>
          <list items={[
            {text: 'restart', value: 'restart'},
            {text: 'shutdown', value: 'shutdown'},
            {text: 'sleep', value: 'sleep'},
            {text: 'lock', value: 'lock'},
            {text: 'log out', value: 'log out'},
            {text: 'logout', value: 'log out'},
            {text: 'log off', value: 'log out'},
            {text: 'logoff', value: 'log out'}
          ]} id='verb' unique />
          <list items={[' computer', ' the computer', ' system', ' the system']} limit={1} optional limited />
        </sequence>
        <sequence id='verb' value='empty-trash'>
          <literal text='empty ' />
          <literal text='the ' optional limited />
          <literal text='Trash' />
        </sequence>
        <sequence id='verb' value='screensaver'>
          <list items={['turn on ', ' start ']} limit={1} />
          <literal text='the ' optional limited />
          <list items={['screensaver']} limit={1} />
        </sequence>
        <sequence id='verb'>
          <literal text='turn off ' />
          <literal text='the ' optional limited />
          <choice merge>
            <list items={['display', 'screen']} limit={1} value='display-off' />
            <list items={['computer', 'system']} limit={1} value='shutdown' />
          </choice>
        </sequence>
      </choice>
    )
  }
}

export const extensions = [SystemCommands]