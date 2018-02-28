import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import styled from 'styled-components';
import events from '../event';
import './Calendar.css';

const StyledDiv = styled.div`
	height: 800px;
	padding: 25px;
`;
require('moment/locale/zh-tw');
moment.locale('zh-tw');
BigCalendar.momentLocalizer(moment);

const messages = {
	allDay: '整日活動',
	previous: '<',
	next: '>',
	today: '今日',
	month: '月',
	week: '週',
	day: '日',
	agenda: '行程表',
	date: '日期',
	time: '時間',
	event: '活動',
	showMore: total => `還有 ${total} 項...`
};

const formats = {
	timeGutterFormat: 'HH:mm',
	dayRangeHeaderFormat: ({ start, end }, culture, local) =>
		local.format(start, 'M月DD日', culture) +
		' - ' +
		local.format(end, 'M月DD日', culture),
	eventTimeRangeFormat: ({ start, end }, culture, local) =>
		local.format(start, 'HH:mm', culture) +
		' - ' +
		local.format(end, 'HH:mm', culture),
	monthHeaderFormat: 'YYYY年M月',
	dayFormat: 'MM/DD 星期dd',
	dateFormat: 'D日',
	dayHeaderFormat: '星期dd M月DD日',
	agendaTimeRangeFormat: ({ start, end }, culture, local) =>
		local.format(start, 'HH:mm', culture) +
		'-' +
		local.format(end, 'HH:mm', culture),
	agendaDateFormat: 'MM/DD 星期dd'
};

let Calendar = () => (
	<StyledDiv>
		<BigCalendar
			selectable
			formats={formats}
			timeslots={2}
			step={60}
			messages={messages}
			events={events}
			defaultView="month"
			scrollToTime={new Date(1970, 1, 1, 6)}
			defaultDate={new Date(2015, 3, 12)}
			onSelectEvent={event => alert(event.title)}
			onSelectSlot={slotInfo =>
				alert(
					`selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
						`\nend: ${slotInfo.end.toLocaleString()}` +
						`\naction: ${slotInfo.action}`
				)
			}
		/>
	</StyledDiv>
);

export default Calendar;
