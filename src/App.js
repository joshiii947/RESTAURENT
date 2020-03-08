import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: [],
      isFetch: false,
      yearCount: {},
      totalYear: [],
      showValues: false,
      year: 0
    }
  }

  fetchValue() {
    fetch("http://starlord.hackerearth.com/TopRamen")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            values: result,
            isFetch: true
          });
          this.showByYear();
        },
        (error) => {
          this.setState({
            isFetch: false,
            error
          });
        }
      )
  }

  componentDidMount() {
    this.fetchValue();
  }

  showByYear = () => {

    let year = this.state.values
    let insertYear = {}
    insertYear[NaN] = {}
    let yearTotal = []

    for (let i = 0; i < year.length; i++) {
      const year1 = year[i]['Top Ten'].split(" ")
      const year2 = year1[0]

      if (insertYear.hasOwnProperty(year2)) {
        if (year1[0] === NaN) {
          insertYear[year2][year1[NaN]] = year[i]
        }
        else {

          if (year1 != "NaN") {
            const year3 = year1[1].split('#')

            insertYear[year2][year3[1]] = year[i]
          }
          else {
            insertYear[year2][year1[1]] = year[i]
          }
        }
      }
      else {
        if (year1 === NaN) {
          insertYear[year2] = {}
          insertYear[year2][year1[1]] = year[i]
          yearTotal.push(year1[0])
        }
        else {

          insertYear[year2] = {}

          const year3 = (year1[1].split("#"))

          insertYear[year2][year3[1]] = year[i]
          yearTotal.push(year1[0])
        }
      }

      if (i === year.length - 1) {
        this.setState({
          yearCount: insertYear,
          totalYear: yearTotal,
          showValues: true
        })
      }
    }
  }

  setYear = (val) => {
    this.setState({
      year: val
    })
  }

  render() {

    const brand = () => this.state.showValues === true && Object.keys(this.state.yearCount).map((item, index) => {
      return Object.keys(this.state.yearCount[item]).map((value, index) => {
        return <div className="card-body">
          <p style={{ color: "#708090", fontFamily: "sans-serif", fontSize: "2.6rem" }}>{this.state.yearCount[item][value]['Top Ten']}</p>
          <div className="row">
            <div className="col-lg-3">
              <h4 className="card-text">COUNTRY:<span className="badge badge-danger badge-lg"> {this.state.yearCount[item][value]['Country']}</span></h4>
            </div>
            <div className="col-lg-3">
              <h4 className="card-text">STARS:<span className="badge badge-secondary badge-lg">{this.state.yearCount[item][value]['Stars']} </span></h4>
            </div>
            <div className="col-lg-3">
              <h4 className="card-text" style={{ whiteSpace: "nowrap" }}>VARIETY:<span className="badge badge-primary badge-lg">{this.state.yearCount[item][value]['Variety']} </span></h4>
            </div>
            <div className="col-lg-3">
              <h4 className="card-text" >BRAND:<span className="badge badge-warning badge-lg">{this.state.yearCount[item][value]['Brand']}</span></h4>
            </div>
          </div>
          <hr></hr>
        </div>
      });
    });


    const TopBrand = () => this.state.showValues === true && Object.keys(this.state.yearCount).map((item, index) => {
      return Object.keys(this.state.yearCount[item]).map((value, index) => {
        {
          let value3 = (this.state.yearCount[item][value]['Top Ten'])
          value3 = value3.split(" ")

          if (value3[1] === "#1") {
            return <div className="card-body">
              <p style={{ color: "#708090", fontFamily: "sans-serif", fontSize: "2.6rem" }}>{this.state.yearCount[item][value]['Top Ten']}</p>
              <div className="row">
                <div className="col-lg-3">
                  <h4 className="card-text">COUNTRY:<span className="badge badge-danger badge-lg"> {this.state.yearCount[item][value]['Country']}</span></h4>
                </div>
                <div className="col-lg-3">
                  <h4 className="card-text">STARS:<span className="badge badge-secondary badge-lg">{this.state.yearCount[item][value]['Stars']} </span></h4>
                </div>
                <div className="col-lg-3">
                  <h4 className="card-text" style={{ whiteSpace: "nowrap" }}>VARIETY:<span className="badge badge-primary badge-lg">{this.state.yearCount[item][value]['Variety']} </span></h4>
                </div>
                <div className="col-lg-3">
                  <h4 className="card-text" >BRAND:<span className="badge badge-warning badge-lg">{this.state.yearCount[item][value]['Brand']}</span></h4>
                </div>
              </div>
              <hr></hr>
            </div>
          }
        }
      });
    });


    return (
      <div>
        <div className="header"><h4 className="jumbotron font-italic">USER INFORMATION OF ALL RESTAURANT IS AS FOLLOWS</h4></div>
        <div className="offset-lg-4">
          <button type="submit" onClick={()=>this.setYear("0")} className="btn btn-info">SHOW ALL</button>

          <button type="submit" onClick={()=>this.setYear("1")} className="btn btn-success offset-lg-2">SHOW TOP RESTAURENT BY YEAR</button>
        </div>
        <div>

          {this.state.year=='1' ? TopBrand() : brand()}

        </div>

        <div className="container">
          <div className="row">
            <div className="col-lg-3"></div>

          </div>
        </div>
      </div>

    )
  }
}

export default App;


