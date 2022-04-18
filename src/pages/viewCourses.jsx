import React from "react";
import AdminDashboard from '../components/adminDashboard';
import vc from '../styles/viewCourses.module.css'

function ViewCourses() {
    return (  
        <React.Fragment>
            <AdminDashboard/>

            <div className={vc.course_details}>
                <h1>COURSE VIEWER</h1>
                    <table className={`${vc.table} ${vc.table_light} ${vc.table_striped} ${vc.scrollable}`}>
                        <tr className={vc.attributes}>
                            <th>Course Name</th>
                            <th>Semester</th>
                            <th>Instuctor's Last Name</th>
                            <th>Status</th>

                        </tr>
                        <tr>
                            <td className={vc.filterable_cell}>ENSF 480</td>
                            <td className={vc.filterable_cell}>Fall 2019</td>
                            <td className={vc.filterable_cell}>Huffington</td>
                            <td className={vc.filterable_cell}>Completed</td>
                        </tr>
                        <tr>
                        <td className={vc.filterable_cell}>ENSF 409</td>
                        <td className={vc.filterable_cell}>Spring 2020</td>
                        <td className={vc.filterable_cell}>Terster</td>
                        <td className={vc.filterable_cell}>Completed</td>
                        </tr>
                        <tr>
                        <td className={vc.filterable_cell}>CPSC 471</td>
                        <td className={vc.filterable_cell}>Winter 2022</td>
                        <td className={vc.filterable_cell}>Sailunaz</td>
                        <td className={vc.filterable_cell}>Ongoing</td>
                        </tr>
                    </table>
                <div className={vc.in}>
                    <input type="number"/>
                    <span 
                        id="search" 
                        onclick="SearchStudentGrades()" 
                        className={`${vc.btn} ${vc.btn_outline_light}`}>
                        Search Course(s)</span>
                </div>
            </div>
        </React.Fragment>
    );
}

export default ViewCourses;