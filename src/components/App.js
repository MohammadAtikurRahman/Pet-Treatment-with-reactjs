import React, { Component } from 'react';
import '../css/App.css';
import JoinTheTour from './JoinTheTour';
import SearchTheTour from './SearchTheTour';
import ListTheTour from './ListTheTour';

import {  findIndex, without } from 'lodash';

class App extends Component {
  
  constructor(){
     
    super();
    this.state={
          
    
        myJoiningTour: [],
        formDisplay: false,
        orderBy: 'petName',
        orderDir: 'asc',
        queryText: '',
        lastIndex: 0

    };

              this.deleteTour =this.deleteTour.bind(this)
              this.toggleForm = this.toggleForm.bind(this)
              this.joinTheTour = this.joinTheTour.bind(this)
              this.changeOrder = this.changeOrder.bind(this)
              this.searchApts = this.searchApts.bind(this)
              this.updateInfo = this.updateInfo.bind(this);


  } 

  toggleForm(){

       this.setState({
        
        formDisplay: !this.state.formDisplay

       });

    

  }

  searchApts(query){

             this.setState({queryText: query});

  }



 changeOrder(order , dir){

   this.setState({

    orderBy: order,
    orderDir: dir
      
   });


 }

  updateInfo(name, value, id) {
    let tempApts = this.state.myJoiningTour;
    let aptIndex = findIndex(this.state.myJoiningTour, {
      tourId: id
    });
    tempApts[aptIndex][name] = value;
    this.setState({
      myJoiningTour: tempApts
    });
  }



  joinTheTour(tour){

     let tempApts = this.state.myJoiningTour;
     tour.tourId = this.state.lastIndex;
     tempApts.unshift(tour);
     this.setState({

            myJoiningTour: tempApts,
            lastIndex: this.state.lastIndex + 1

     });



  }

  deleteTour(tour){
     
    let tempTours = this.state.myJoiningTour;
    tempTours = without(tempTours,tour);
      
    this.setState({

      myJoiningTour: tempTours

    })

  }


  componentDidMount(){
         
      fetch('./data.json')
      .then(response => response.json())
      .then(result =>{
          
        const joins = result.map(item => {


          item.tourId = this.state.lastIndex;
          this.setState({lastIndex: this.state.lastIndex+1});


          return item;
        })

        this.setState({

          myJoiningTour: joins
        });

      })
           
     
  }


  


  render() {
    

    //  const listItem =this.state.myJoiningTour.map(item =>(
    //         <div>
    //             <div>{item.petName}</div>
    //             <div>{item.ownerName}</div>

    //         </div>


    //  ))



    let order;
    let filteredApts = this.state.myJoiningTour
    if(this.state.orderDir=== 'asc'){


      order = 1;
    } else {

       order= -1;

    }
    filteredApts =  filteredApts.sort((a,b) => {

      if (a[this.state.orderBy].toLowerCase() < b[this.state.orderBy].toLowerCase()
          
          
          
          ) {

                return -1*order;


          } else{

              return 1*order;

          }


    }).filter(eachItem => {
         
      return(

        eachItem['petName']
        .toLowerCase()
        .includes(this.state.queryText.toLowerCase()) ||

        eachItem['ownerName']
        .toLowerCase()
        .includes(this.state.queryText.toLowerCase()) ||

        eachItem['aptNotes']
        .toLowerCase()
        .includes(this.state.queryText.toLowerCase()) 

      )


    });








    return (
      <main className="page bg-white" id="petratings">
        <div className="container">
          <div className="row">
            <div className="col-md-12 bg-white">
              <div className="container">

                {/* <h1> {this.state.tourGroup}  </h1>       */}

                         {/* {listItem} */}

                  <JoinTheTour
                  
                    formDisplay={this.state.formDisplay}
                  toggleForm={this.toggleForm}
                  joinTheTour={this.joinTheTour}
                  
                  />
                  <SearchTheTour
                  
                    orderBy ={this.state.orderBy}
                    orderDir = {this.state.orderDir }
                    changeOrder = {this.changeOrder}
                    searchApts={this.searchApts}
                  
                  />
              
              
                  <ListTheTour  tours={filteredApts}
                  
                            deleteTour ={this.deleteTour}

                            updateInfo={this.updateInfo}
                  
                  />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default App;