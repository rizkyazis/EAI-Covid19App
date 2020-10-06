import React, { Component } from 'react'
import SearchTable from 'reactable-search';

function Cards(props) {
  return (
    <div className={props.classcard}>
      <div className="card-header">{props.header}</div>
      <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
        <p className="card-text">{props.text}</p>
      </div>
    </div>
  )
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
      globalData: {},
    }
  }

  componentDidMount() {
    fetch('https://api.covid19api.com/total/country/indonesia')
      .then(res => res.json())
      .then(json => {
        this.setState({
          items: json,
          isLoaded: true
        })
        console.log(json)
      })

    fetch('https://api.covid19api.com/summary')
      .then(res => res.json())
      .then(result => {
        this.setState({
          globalData: result,
        })
        console.log(result)
      })
  }

  render() {

    var { isLoaded, items, globalData } = this.state;

    if (!isLoaded) {
      return <div>Loading...</div>
    }

    else {
      return (
        <div className="App layout">
          <div className="header bg-dark">
            <center><h1>APLIKASI PEMANTAUAN COVID19</h1></center>
          </div>
          <div className="row">
            <div className="col list-data">
              <h3 className="header bg-dark"><center>DATA GLOBAL COVID19</center></h3>
              <div class="row">
                <div class="col">
                  <Cards header="New Confirmed" classcard="card text-white bg-primary mb-3" title={globalData.Global.NewConfirmed}/>
                </div>
                <div class="col">
                  <Cards header="Total Confirmed" classcard="card text-white bg-primary mb-3" title={globalData.Global.TotalConfirmed} />
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <Cards header="New Deaths" classcard="card text-white bg-danger mb-3" title={globalData.Global.NewDeaths} />
                </div>
                <div class="col">
                  <Cards header="Total Deaths" classcard="card text-white bg-danger mb-3" title={globalData.Global.TotalDeaths} />
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <Cards header="New Recovered" classcard="card text-white bg-warning mb-3" title={globalData.Global.NewRecovered} />
                </div>
                <div class="col">
                  <Cards header="Total Recovered" classcard="card text-white bg-warning mb-3" title={globalData.Global.TotalRecovered} />
                </div>
              </div>
            </div>
            <div className="col list-data">
              <h3 className="header bg-dark"><center>DATA COVID19 INDONESIA</center></h3>
              <SearchTable searchPrompt="Type to search" rows={items} />
            </div>
          </div>
        </div>
      )
    }
  }
}
export default App;
