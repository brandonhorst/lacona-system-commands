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
          ]} category='action' id='verb' limit={5} />
          <list items={[' computer', ' the computer', ' system', ' the system']} limit={1} optional limited category='action' />
        </sequence>
        <sequence id='verb' value='empty-trash'>
          <literal text='empty ' category='action' />
          <literal text='the ' optional limited category='action' />
          <literal text='Trash' category='action' />
        </sequence>
        <sequence id='verb' value='screensaver'>
          <literal text='turn on ' category='action'/>
          <literal text='the ' optional limited category='action' />
          <list items={['screensaver', 'screensaver']} limit={1} category='action' />
        </sequence>
        <sequence id='verb'>
          <literal text='turn off ' category='action' />
          <literal text='the ' optional limited category='action' />
          <choice merge>
            <list items={['display', 'screen']} limit={1} category='action' value='display-off' />
            <list items={['computer', 'system']} limit={1} category='action' value='shutdown' />
          </choice>
        </sequence>
      </choice>
    )
  }
}

export const extensions = [SystemComands]