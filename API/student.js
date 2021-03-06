const express = require("express");
const db = require("../db");
const router = express.Router();
// endpoint 1 & 2

// localhost:5001/student/checklogin?UCID=30098787&password=test2

router.get("/checkLogin", (req, res) => {
  let ucid = req.query.UCID;
  let pass = req.query.password;
  let query = `SELECT * FROM ACCOUNT WHERE UCID ='${ucid}' AND password='${pass}'`;
  db.query(query, (err, result) => {
    if (err) console.error(err);
    if (result.length > 0) {
        if(ucid.charAt(0) == 1){
      res.send({ account: 'Admin' });
        }
      else res.send({ account: 'Student' });
    } else {
      res.send({ account: 'ERROR' });
    }
  });
});




router.get('/studentInfo',(req,res)=>{

  let ucid = req.query.UCID;

  let query = `SELECT COUNT(*) as appears FROM MINORS_IN WHERE UCID = ${ucid} `
  db.query(query, (err, result) => {
    if (err) console.error(err);
    else return res.json(result);
  });
});

router.get('/studentInfomm',(req,res)=>{

  let ucid = req.query.UCID;

  let query = `SELECT STUDENT.UCID, MAJORS_IN.Program as Major, MINORS_IN.Program as Minor, MINORS_IN.Year_program as Minor_year, MAJORS_IN.Year_program as Major_year FROM (STUDENT JOIN MAJORS_IN ON STUDENT.UCID= MAJORS_IN.UCID) JOIN MINORS_IN ON STUDENT.UCID = MINORS_IN.UCID WHERE STUDENT.UCID= ${ucid} `
  console.log(query);
  db.query(query, (err, result) => {
    if (err) console.error(err);
    else {
      console.log(result);
      return res.json(result);
    }
  });
});

router.get('/studentInfom',(req,res)=>{

  let ucid = req.query.UCID;

  let query = `SELECT STUDENT.UCID, MAJORS_IN.Program as Major, MAJORS_IN.Year_program as Major_year FROM (STUDENT JOIN MAJORS_IN ON STUDENT.UCID= MAJORS_IN.UCID)`
  db.query(query, (err, result) => {
    if (err) console.error(err);
    else return res.json(result);
  });
});


// endpoint 3
// http://localhost:5001/student/createStudent?First_name=Sam&Last_name=Fam&date=06262001&Address=119 Doulgasview Rd SE&Postalcode=T8M9V6&City=Calgary&Province=AB&Country=Canada&UCID=30090275&Phone_number=403-975-4511&pass=pa55word&Confirmed_pass=pa55word&Program=Psychology&Minor=&Dept_name=Psychology&Year_of_program=3&Year_of_minor&minor_dept
router.post("/createStudent", (req, res) => {
    let fName = req.query.First_name;
    let lName = req.query.Last_name;
    let date = req.query.date;
    let addr = req.query.Address;
    let Postal = req.query.Postalcode;
    let City = req.query.City;
    let Province = req.query.Province;
    let Country = req.query.Country;
    let UCID = req.query.UCID;
    let Phone = req.query.Phone_number;
    let pass = req.query.pass;
    let confpass = req.query.Confirmed_pass;
    let prog = req.query.Program;
    let deptname = req.query.Dept_name;
    let yop = req.query.Year_of_program;
    let min = req.query.Minor;
    let dept_min = req.query.minor_dept;
    let yom = req.query.Year_of_minor;
    
    let properDate =
    date.substring(0, 2) + "/" + date.substring(2, 4) + "/" + date.substring(4);
  
    if (pass === confpass){
      
      let query = `INSERT INTO ACCOUNT VALUES(${UCID},'${pass}')`;
      let query2 = `INSERT INTO STUDENT VALUES (${UCID},'${fName}','${lName}','${properDate}','${Phone}','${addr}','${Postal}','${City}','${Province}','${Country}',${UCID});`;
      let query3 = `INSERT INTO MAJORS_IN VALUES(${UCID},'${deptname}',${yop},'${prog}')`;

      // adds to account
      db.query(query, (err) => {
        if (err) console.error(err);
  
        else {
          console.log("Account added...");
        }
      });
      // adds to student
      db.query(query2, (err) => {
        if (err) console.error(err);
  
        else {
          console.log("Student added...");
        }
      });
      // adds to minor if applicable
      if (min !== "" || yom !== "" || dept_min !== "") {
        let query4 = `INSERT INTO MINORS_IN 
        VALUES(${UCID},'${dept_min}','${yom}','${min}')`;

        db.query(query4, (err) => {
          if (err) console.error(err);
    
          else {
            console.log("Minor added...");
          }
        });
      }

      // adds to major
      db.query(query3, (err) => {
        if (err) console.error(err);
  
        else {
          console.log("Major added...");
        }
      });

      return res.send({ UCID: UCID });
    }

    else {
      return res.send('Passwords did not match' );
    }
});

// endpoint 9
router.get("/getGrades", (req, res) => {
  let UCID = req.query.UCID;

  let query = `SELECT GRADE.S_UCID, GRADE.Course_Name, GRADE.Letter_grade, GRADE.course_semester FROM GRADE WHERE S_UCID = '${UCID}'`;

  //generic query
  db.query(query, (err, result) => {
    if (err) console.error(err);
    else return res.json(result);
  });
});
module.exports = router;
