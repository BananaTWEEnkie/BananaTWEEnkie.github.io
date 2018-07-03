function testName(testCases) {
	let testName = testCases.test_name;
	d3.select("#testName").text(testName);
}

function showStatusText(testCases){
	let status = testCases.status;
	if(!status) {
		d3.select("#status")
			.attr("class", "bad")
			.text("Failed");
	} else {
		d3.select("#status")
			.attr("class", "good")
			.text("Success");
	}
}

function testStep(testSteps){
	let testStep = testSteps.step_name;
	d3.select("#testStep").text("Test Step: " + testStep);
}

function status(testSteps){
	let status = testSteps.status;
	let statusText = document.createTextNode(status);
	if(!status){
		status.classList.add("failed");
	}
	document.getElementById("status").appendChild(statusText);
}

function createResultsHeader(testStepsDataDiv){
	let resultsHeader = document.createElement("h1");
	resultsHeader.innerHTML = "Results"
	testStepsDataDiv.appendChild(resultsHeader);
	let hr = document.createElement("hr");
	testStepsDataDiv.appendChild(hr);
}

function createBoldText(text){
	let boldText = document.createElement("b");
	boldText.classList.add("data-header");
	boldText.innerHTML = text;

	return boldText;
}

function createLineBreak(testStepsDataDiv){
	let lineBreak = document.createElement("br");
	testStepsDataDiv.appendChild(lineBreak);
}

function createRow(testStepsDataDiv){
	let row = document.createElement("div");
	row.classList.add("row");
	testStepsDataDiv.appendChild(row);

	return row;
}

function createColumn(row){
	let column = document.createElement("div");
	column.classList.add("col-md");
	row.appendChild(column);

	return column;
}

function createImage(screenshot, countImages){
	d3.select(".carousel-inner")
		.append("div")
		.attr("class", function(d, i) {
			if(countImages === 0) {
				return "carousel-item active"
			} else {
				return "carousel-item";
			}
		})
		.append("img")
		.attr("class", "d-block")
		.attr("src", "img/" + screenshot)
		.attr("alt", function (d, i) {
			return "slide #" + countImages;
		})
		.style("margin", "auto");

		countImages++;

		return countImages;
}

function createDataChart(testStepsData, column, color){
	let dataset = testStepsData;
	let maxValue = d3.max(dataset);
	let width = 75;
	let height = 100;
	let barPadding = 3;
	let barWidth = (width / dataset.length);

	let svg = d3.select(column)
		.append("svg")
		.attr("width", width)
		.attr("height", height)
		.attr("class", "bar-chart");

	let yScale = d3.scaleLinear()
		.domain([0, d3.max(dataset)])
		.range([0, height - 10]);

	let barChart = svg.selectAll("rect")
		.data(dataset)
		.enter()
		.append("rect") // appends a rectangle for each data element
		.attr("fill", color)
		.attr("y", function(d) {
			return height - yScale(d);
		})
		.attr("height", function(d) {
			return yScale(d);
		})
		.attr("width", barWidth - barPadding)
		.attr("transform", function (d, i) {
			let translate = [barWidth * i, 0];
			return "translate(" + translate + ")";
		});

	let text = svg.selectAll("text")
		.data(dataset)
		.enter()
		.append("text")
		.text(function(d) {
			return d;
		})
		.attr("fill", "white")
		.attr("font-size", "10px")
		.attr("y", function(d, i) {
			return height - yScale(d) - 2;
		})
		.attr("x", function(d, i) {
			return barWidth * i;
		});
}

function createLaunchTimeElement(launchTime, launchColumn){
	let info = document.createElement("text");
	let text = document.createTextNode("Average Time: " + launchTime + " ms");
	info.appendChild(text);
	// change color of text to show if data is good(green) or bad(red)
	if(launchTime < 250){
		info.classList.add("good");
	} else if(launchTime < 500){
		info.classList.add("average");
	} else{
		info.classList.add("bad");
	}
	launchColumn.appendChild(info);

	createLineBreak(launchColumn);
}

function createMemoryElement(memory, memoryColumn){
	let info = document.createTextNode("Average Memory: " + memory + " kb");
	memoryColumn.appendChild(info);

	createLineBreak(memoryColumn);
}

function createCPUElement(cpu, cpuColumn){
	let info = document.createTextNode("Average CPU Usage: " + cpu + "%");
	cpuColumn.appendChild(info);

	createLineBreak(cpuColumn);
}

const start = async function() {
	// gather all data from json file
	const data = await d3.json("data.json");

	let testCases = data.test_cases;
	let countList = 0;
	let countImages = 0;
	for(let i = 0; i < testCases.length; i++) {
		let testSteps = data.test_cases[i].test_steps;
		for(let i = 0; i < testSteps.length; i++) {
			d3.select(".carousel-indicators")
				.append("li")
				.attr("class", function() {
					if(countList === 0) {
						return "active"
					} else { return; }
				})
				.attr("data-target", "#myCarousel")
				.attr("data-slide-to", function() { return countList; } )
				countList++;
			countImages = createImage(testSteps[i].screenshot, countImages);
		}
	}

	update(0, 0)
}

const update = async function(testCaseNumber, testStepNumber) {
	// gather all data from json file
	const data = await d3.json("data.json");

	let testCases = data.test_cases[testCaseNumber]

	testName(testCases);
	showStatusText(testCases);

	// show users the steps the bot is taking
	let testSteps = testCases.test_steps;
	testStep(testSteps[testStepNumber]);

	// create a div for each data
	let testStepsDataDiv = document.getElementsByClassName("container-fluid")[0];

	createResultsHeader(testStepsDataDiv);

	// display performance data
	let row = createRow(testStepsDataDiv);

	// attach information to each screenshot
	let launchTimeColumn = createColumn(row);
	launchTimeColumn.appendChild(createBoldText("Launch Time"));
	// Creating chart with d3.js
	createDataChart(testSteps[testStepNumber].launch_times, launchTimeColumn, "steelblue");
	createLineBreak(launchTimeColumn);

	let sum = 0;

	let launchTime = testSteps[testStepNumber].launch_times;
	if(launchTime.hasOwnProperty("length")) {	
		for(let k = 0; k < launchTime.length; k++) {
			sum += launchTime[k]; 
		}

		let average = sum/launchTime.length;
		// reset sum
		sum = 0;
		createLaunchTimeElement(average.toFixed(2), launchTimeColumn);
	}

	let memoryColumn = createColumn(row);
	memoryColumn.appendChild(createBoldText("Memory"));
	createDataChart(testSteps[testStepNumber].memory, memoryColumn, "orange");
	createLineBreak(memoryColumn);

	let memory = testSteps[testStepNumber].memory;
	if(memory.hasOwnProperty("length")) {
	for(let k = 0; k < memory.length; k++) {
			sum += memory[k]; 
		}

		let average = sum/memory.length;
		// reset sum
		sum = 0;
		createMemoryElement(average.toFixed(2), memoryColumn);	
	}	

	let cpuColumn = createColumn(row);
	cpuColumn.appendChild(createBoldText("CPU"));
	createDataChart(testSteps[testStepNumber].cpu, cpuColumn, "#82b446");
	createLineBreak(cpuColumn);

	let cpu = testSteps[testStepNumber].cpu;
	if(cpu.hasOwnProperty("length")) {	
		for(let k = 0; k < cpu.length; k++) {
			sum += cpu[k]; 
		}

		let average = sum/cpu.length;
		// reset sum
		sum = 0;
		createCPUElement(average.toFixed(2), cpuColumn);		
	}		
}

// Call start
start();