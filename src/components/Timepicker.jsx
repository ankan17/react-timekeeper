import React, { PropTypes } from 'react'

import parseTime from '../helpers/parse-time'
import ClockWrapper from './ClockWrapper'
import Time from './Time'

import css from 'reactcss'

class Timepicker  extends React.Component {
	constructor(props){
		super(props)

		this.state = {
			...parseTime(props.time),
			unit: 'hour'
		}

		this.changeHour =  this.handleTimeChange.bind(this, 'hour')
		this.changeMinute =  this.handleTimeChange.bind(this, 'minute')
		this.changeUnit =  this.changeUnit.bind(this)
		this.changeMeridiem = this.handleMeridiemChange.bind(this)
	}

	componentWillReceiveProps(nextProps){
		if (nextProps.time){
			this.setState({
				time: parseTime(nextProps.time)
			})
		}
	}

	getTime(){
		const state = this.state;
		const meridiemAdd = state.meridiem === 'pm' ? 12 : 0
		return {
			formatted: `${state.hour}:${state.minute} ${state.meridiem}`,
			formattedSimple: `${state.hour}:${state.minute}`,
			formatted24: `${state.hour + meridiemAdd}:${state.minute}`,
			hour: state.hour,
			hour24: state.hour + meridiemAdd,
			minute: state.minute,
			meridiem: state.meridiem
		}
	}

	handleTimeChange(unit, val){
		console.debug( 'change ', unit, ' with new: ', val )
		if (unit === 'hour' && val === 0){
			val = 12
		} else if (unit === 'minute' && val === 60){
			val = 0
		}

		this.setState({
			[unit]: val
		})

		this.props.onChange && this.props.onChange( this.getTime() )
	}
	handleMeridiemChange(val){
		if (val !== this.state.meridiem){
			this.setState({
				meridiem: val
			})

			this.props.onChange && this.props.onChange( this.getTime() )
		}
	}

	changeUnit(newUnit){
		const currentUnit = this.state.unit;
		if (currentUnit === newUnit){
			return;
		}
		this.setState({ unit: newUnit })
	}

	render(){
		const styles = css({
			default: {
				timePicker: {
					fontFamily: '"Roboto", serif',
					background: '#F2F2F2',
					borderRadius: '3px',
					// border: '1px solid #DDD',
					display: 'inline-block',
					// boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
					boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)', 	// bigger
					width: '300px',

					position: 'relative'
				},
				doneButton: {
					display: 'block',
					color: '#444',
					textTransform: 'uppercase',
					borderTop: '1px solid #CCC',
					textAlign: 'center',
					cursor: 'pointer',
					padding: '20px 0',
					fontSize: '14px',
					letterSpacing: '0.5px',
					fontWeight: 500
				}
			}
		})

		const state = this.state
		const props = this.props
		return (
			<div style={styles.timePicker} className="react-timekeeper">
				<style>{`
					.react-timekeeper {
						-webkit-tap-highlight-color:transparent;
					}
					.react-timepicker-button-reset {
						background: 0;
						border: 0;
						box-shadow: none;
						text-shadow: none;
						-webkit-appearance: none;
						-moz-appearance: none;
						cursor: pointer;
					}
					.react-timepicker-button-reset:hover, .react-timepicker-button-reset:focus, .react-timepicker-button-reset:active {
						outline: none;
					}
					.react-timepicker-button-reset::-moz-focus-inner {
						border: 0;
						padding: 0;
					}
				`}</style>

				<Time
					unit={state.unit}
					hour={state.hour}
					minute={state.minute}
					meridiem={state.meridiem}

					changeMeridiem={this.changeMeridiem}
					changeUnit={this.changeUnit}
				/>
				
				<ClockWrapper
					unit={state.unit}
					hour={state.hour}
					minute={state.minute}
					meridiem={state.meridiem}
					hourFormat={props.hourFormat}

					changeHour={this.changeHour}
					changeMinute={this.changeMinute}
					changeMeridiem={this.changeMeridiem}
				/>
				
				<span style={styles.doneButton}>Done</span>
			</div>
		)
	}
}


Timepicker.propTypes = {
	time: PropTypes.string,
	hourFormat: PropTypes.number,
	onChange: PropTypes.func,
	
	// TODO - update props based on API in readme
	displayDone: PropTypes.bool,
	doneOnClick: PropTypes.func,
	closeOnMinuteSelect: PropTypes.bool
}

export default Timepicker