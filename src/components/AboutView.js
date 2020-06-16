import React from 'react';
import './AboutView.css'

function AboutView() {
    return (
        <div className="instructions">
            <h1>How To Use</h1>
            <p>This applet mimics the weight and balance form used by TW-5 aircrews flying the TH-57B/C</p>
            <p>After completion of the form, you may copy the url to share the results with another crew member, instructor, or duty officer.</p>
            <p>Remember: "Garbage in, garbage out." Your form will only be as accurate as the information you enter into the appropriate fields. Some entries have no effect on the final result and are for information purpose only. Other entries are used in the calculation of total weight and center of gravity.</p>
            <h3>Event</h3>
            <p>The event field is for information purposes only</p>
            <h3>Instructor</h3>
            <p>Start typing your instructor's last name to bring up a dropdown of options matching the typed characters. Pick the appropriate instructor (be careful of instructors with common last names). The instructors weight with wet vest will autopopulate into the form. You may select the dry vest weight or manually change the weight as necessary. The instructor weight value will be used to calculate Crew Forward weight.</p>
            <p>The instructor list can be viewed from the "Inst List" tab to quickly verify all weights are current.</p>
            <h3>Aircraft</h3>
            <p>Aircraft are listed numerically in the dropdown box. Select "unkB" or "unkC" if you do not have an aircraft assigned. The form will automatically calculate heaviest and most forward CG for your series of aircraft. If an aircraft is selected, the weight and moment will be autopopulated into the form. The aircraft spot is for information purposes only.</p>
            <p>The aircraft list can be viewed from the "A/C List" tab to quickly verify all weights and moments are current.</p>
            <h3>Weather</h3>
            <p>The current and forecast weather are for information purposes only.</p>
            <h3>Date</h3>
            <p>The date will autopopulate to today. It is for information purposes only.</p>
            <h3>Student</h3>
            <p>Student name is for information purposes only, but will help identify who completed the form when it is sent to another person.</p>
            <h3>Student Weight</h3>
            <p>Enter the student weight including all gear. This does not include any bags or passengers which will be entered later. Student weight is used to calculate crew forward.</p>
            <h3>Max Temperature, Pressure Altitude, and Density Altitude</h3>
            <p>These values are obtained from the DD-175-1. Only the Density Altitude is used to calculate HIGE/HOGE power requirements. Temperature and PA are for information purposes only, but may be used to manually calculate DA.</p>
            <h3>Fuel</h3>
            <p>Select whether you will take 70 gallons, 65 gallons, or a manual amount of fuel. The set max button will set the maximum amount of fuel to keep the aircraft below 3200 lbs given the current Takeoff Gross Weight, no higher than 91 gallons.</p>
            <h3>Crew Aft</h3>
            <p>Enter the weight of any passengers or rear crew members.</p>
            <h3>Baggage</h3>
            <p>Enter the weight of any gear loaded into the cargo area.</p>
            <h3>External Load Operations</h3>
            <p>Check the External OPS checkbox to bring up the external ops section and include it in the overall calculations. Set the expected fuel load at the time of the first pick, the weight of the crewman, and the weight of the load. The set max button will calculate the maximum fuel load you may take to remain below 3350 lbs with the load and 3200 lbs without the load.</p>
            <h3>Results Table</h3>
            <p>The results table is color coded to quickly see all parameters in limits or any problem areas. When out of limits, the field will become red and a yellow caution emoji will be displayed. The HIGE/HOGE field will turn yellow when HIGE is above 85% Q and red when HIGE is above 100% Q.</p>

        </div>
    );
}

export default AboutView;