// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import style_iphone from '../button/style_iphone';
// import jquery for API calls
import $ from 'jquery';



export default class Iphone extends Component {
//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props){
		super(props);
		// temperature state
		this.state.temp = "";
		// button display state
		this.setState({ display: true });
		//
		this.fetchWeatherData("London");
		
	}

	// a call to fetch weather data via wunderground
	fetchWeatherData = (cityInput) => {
		var url = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityInput + "&units=metric&appid=64868448ef2a8fd356112873ad72b9fd";
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
			
		})
				// once the data grabbed, hide the button
				this.setState({ display: true });
				console.log(url);
		};

	// the main render method for the iphone component
	
	render() {
		// check if temperature data is fetched, if so add the sign styling to the page
		const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;
		//this.fetchWeatherData = this.fetchWeatherData.bind(this)
		// display all weather data
		return (
			<div class={ style.container }>
				<div class={ style.header }>
					<div class={ style.city }>{ this.state.locate }</div>
					<div class={ style.conditions }>{ this.state.cond }</div>
					<span class={ tempStyles }>{ this.state.temp }</span>
					<div class={ style.humidity }>{ this.state.humd }</div>
					<div class={ style.humidity }>{ this.state.wind }</div>
					<div class={ style.humidity }>{ this.state.pressure }</div>
					<div class={ style.humidity }>{this.state.feelsLike }</div>
					<div class={ style.sunrise }>{ this.state.sunrise }</div>
					<div class={ style.sunset }>{ this.state.sunset }</div>	
					<div class={ style.rise }></div>
					<div class={ style.set }></div>
					<div class={ style.line1 }></div>
					<div class={ style.line2 }></div>
					<div class={ style.box1 }>{ this.state.day1 }</div>
					<div class={ style.box2 }>{ this.state.day2 }</div>
					<div class={ style.box3 }>{ this.state.day3 }</div>
					<div class={ style.box4 }>{ this.state.day4 }</div>
					<div class={ style.box5 }>{ this.state.day5 }</div>
					<div class = {style.search}>
						<form>
							<input type="text"placeholder="search"name="cityInput"id="cityInput"></input>
							<button type="button" onClick={ () => this.fetchWeatherData(document.getElementById("cityInput").value)} >Go</button>
							
						</form>
					</div>
					<div class={ style.tempD1 }>{ this.state.temp1 }</div>
					<div class={ style.tempD2 }>{ this.state.temp2 }</div>
					<div class={ style.tempD3 }>{ this.state.temp3 }</div>
					<div class={ style.tempD4 }>{ this.state.temp4 }</div>
					<div class={ style.tempD5 }>{ this.state.temp5 }</div>
				</div>
				<div class={ style.details }></div>
			</div> 
		);
	}

	parseResponse = (parsed_json) => {
		//parsed_json['list']['0']['main']['temp'] = (parsed_json['list']['0']['main']['temp']).toFixed(0);
		var location = parsed_json['city']['name'];
		var temp_c = parsed_json['list']['0']['main']['temp'].toFixed(0);
		var conditions = parsed_json['list']['0']['weather']['0']['description'];
		var humidity = "Humidity is: " + parsed_json['list']['0']['main']['humidity'] + "%";
		var wind = "Wind Speed is: " + parsed_json['list']['0']['wind']['speed'] + " MPH";
		var pressure = "Pressure: " + parsed_json['list']['0']['main']['pressure'] + " hPa";
		var feels = "Feels like: " + parsed_json['list']['0']['main']['feels_like'];
		var sunrise =  "Sun Rises At: " + new Date(1000 * parsed_json['city']['sunrise']).getHours() + ":" + new Date(1000 * parsed_json['city']['sunrise']).getMinutes();
		var sunset = "Sunset At: " + new Date(1000 * parsed_json['city']['sunset']).getHours() + ":" + new Date(1000 * parsed_json['city']['sunset']).getMinutes();
		
		var x = 0
        var f5 = [];
        var w5 =[];
        
        for(var i = 0; i<5; i++)
        {

            if (parsed_json['list'][x]['weather']['0']['main'] == "Clouds"){
                
                f5.push(<img src={ `../../assets/icons/cloud.png` }width="150"height="100" />);
                w5.push(parsed_json['list'][x]['main']['temp'].toFixed(0));
            }
            else if(parsed_json['list'][x]['weather']['0']['main'] == "Clear"){
                
                f5.push(<img src={ `../../assets/icons/sun.png` }width="100"height="100" />);
                w5.push(parsed_json['list'][x]['main']['temp'].toFixed(0));
            }
            else if(parsed_json['list'][x]['weather']['0']['main'] == "Rain"){
                
                f5.push(<img src={ `../../assets/icons/rain.png` }width="150"height="100" />);
                w5.push(parsed_json['list'][x]['main']['temp'].toFixed(0));
                
            }
            else if(parsed_json['list'][x]['weather']['0']['main'] == "Thunderstorm"){
                
                f5.push(<img src={ `../../assets/icons/thunder.png` }width="150"height="100" />);
                w5.push(parsed_json['list'][x]['main']['temp'].toFixed(0));
            }
            else if(parsed_json['list'][x]['weather']['0']['main'] == "Mist"){
                f5.push(<img src={ `../../assets/icons/mist.png` }width="150"height="100" />);
                w5.push(parsed_json['list'][x]['main']['temp'].toFixed(0));
            }
            x=x+8
			console.log(f5);
			console.log(w5);
        }
        
        var temperature_1 = w5[0];
        var temperature_2 = w5[1];
        var temperature_3 = w5[2];
        var temperature_4 = w5[3];
        var temperature_5 = w5[4];
		
        var desc_1 = f5[0];
        var desc_2 = f5[1];
        var desc_3 = f5[2];
        var desc_4 = f5[3];
        var desc_5 = f5[4];
        		
		// set states for fields so they could be rendered later on
		this.setState({
			locate: location,
			temp: temp_c,
			cond : conditions,
			humd : humidity,
			feelsLike: feels,
			wind : wind,
			pressure : pressure,
			sunrise : sunrise,
			sunset : sunset,
            day1 : desc_1,
            day2 : desc_2,
            day3 : desc_3,
            day4: desc_4,
            day5 : desc_5,
            temp1 : temperature_1,
            temp2 : temperature_2,
            temp3 : temperature_3,
            temp4 : temperature_4,
            temp5 : temperature_5,
		});      
	}


	
}
 