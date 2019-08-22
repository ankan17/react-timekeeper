import React from 'react'
import { Global, css, jsx } from '@emotion/core'

import globalStyle from './styles/global'
import style from './styles/main'
import TopBar from './TopBar'
import ClockWrapper from './ClockWrapper'
import DoneButton from './DoneButton'


// TODO - merge in TimeKeeperWrapper?
export default function TimeKeeper() {
	return (
		<>
			<Global styles={css(globalStyle)} />

			<div className="react-timekeeper" css={style}>
				<TopBar />
				<ClockWrapper  />
				<DoneButton />
			</div>
		</>
	)
}
