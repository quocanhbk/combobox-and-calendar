import React, {useState, useEffect, useRef} from 'react'
import './Calendar.css'
function Calendar(props) {
    let dayName = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    let months = [
        {id: 0, name: 'Jan'},
        {id: 1, name: 'Feb'},
        {id: 2, name: 'Mar'},
        {id: 3, name: 'Apr'},
        {id: 4, name: 'May'},
        {id: 5, name: 'Jun'},
        {id: 6, name: 'Jul'},
        {id: 7, name: 'Aug'},
        {id: 8, name: 'Sep'},
        {id: 9, name: 'Oct'},
        {id: 10, name: 'Nov'},
        {id: 11, name: 'Dec'}
    ]
    let days = [
        {id: 0, name: 'Sunday'},
        {id: 1, name: 'Monday'},
        {id: 2, name: 'Tuesday'},
        {id: 3, name: 'Wednesday'},
        {id: 4, name: 'Thursday'},
        {id: 5, name: 'Friday'},
        {id: 6, name: 'Saturday'}
    ]
    let date = useRef(new Date())
    const [myDate, setMyDate] = useState({day: date.current.getDay(), date: date.current.getDate(), month: date.current.getMonth(), year: date.current.getFullYear()})
    
    const getMonthName = (id) => {
        return months.find(month => month.id === id).name
    }
    const getDayName = (id) => {
        return days.find(day => day.id === id).name
    }
    const getDaysInMonth = (m, y) => {
        m += 1;
        return /8|3|5|10/.test(--m)?30:m===1?(!(y%4)&&y%100)||!(y%400)?29:28:31;
    }
    const [calendar, setCalendar] = useState(() => {
        var dayofmonth = []
        var x = new Date(`${myDate.year}-${myDate.month + 1}-01`).getDay()
        for (var i = 1 - (x + 6 ) % 7; i <= getDaysInMonth(myDate.month, myDate.year); i++) {
            dayofmonth.push(i)
        }
        return dayofmonth
    })
    const swipe = (type) => {
        switch (type) {
            case 'next':
                date.current.setMonth(date.current.getMonth() + 1, 1)
                break;
            case 'prev':
                date.current.setMonth(date.current.getMonth() - 1, 1)
                break;
        }
        setMyDate({day: date.current.getDay(), date: date.current.getDate(), month: date.current.getMonth(), year: date.current.getFullYear()})
        setCalendar(() => {
            var dayofmonth = []
            var x = new Date(`${date.current.getFullYear()}-${date.current.getMonth() + 1}-01`).getDay()
            for (var i = 1 - (x + 6 ) % 7; i <= getDaysInMonth(date.current.getMonth(), date.current.getFullYear()); i++) {
                dayofmonth.push(i)
            }

            return dayofmonth

        })
    }
    const selectDate = (day) => {
        if (day > 0) {
            date.current.setDate(day)
            setMyDate({day: date.current.getDay(), date: date.current.getDate(), month: date.current.getMonth(), year: date.current.getFullYear()})
        }
    }
    useEffect(() => {
        props.returnDate(myDate)
    })
    return (
        <div className="calendar">
        <div className="calendar-head">
            <button className="calendar-button" onClick={() => swipe('prev')}>Prev</button>
            <div className="calendar-date">
                {myDate.date.toLocaleString(undefined, {minimumIntegerDigits: 2}) + " / " + (myDate.month+1).toLocaleString(undefined, {minimumIntegerDigits: 2}) +  " / " + myDate.year}
            </div>
            <button className="calendar-button" onClick={() => swipe('next')}>Next</button>
        </div>
        <ul className="calendar-bar">
            {dayName.map(day => <li key={day}>{day}</li>)}
        </ul>
        <ul className="calendar-content">
            {calendar.map(day => <li key={day} onClick={() => selectDate(day)} className={day === myDate.date ? "calendar-active" : "calendar-unactive"}>{day > 0 ? day : ''}</li>)}
        </ul>
    </div>
    )
}

export default Calendar
