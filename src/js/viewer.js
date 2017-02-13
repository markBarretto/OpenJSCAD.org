import rivets from 'rivets';

export default class Viewer {
	constructor(printerDimensions, inputElements){
        if(printerDimensions && printerDimensions.x && printerDimensions.y && printerDimensions.z ){
            this.printerDimensions = printerDimensions;   
        } else {
            //default bounds
            this.printerDimensions = {
                x: 200,
                y: 200,
                z: 200
            };   
        }
        
        this.inputElements = {};
        
        this.data = {
            scale: 100
        };

        if(typeof inputElements !== 'undefined'){
            if(typeof inputElements.file !== 'undefined'){
                this.inputElements.file = inputElements.file
            } else {
                this.inputElementS.file = document.querySelector('input[name="upload"]');
            }
            if(typeof inputElements.options !== 'undefined'){
                this.inputElements.options = inputElements.options
            } else {
                this.inputElements.options = document.querySelector('#options');
            }
        }
        
	}

    input() {
        var t = this; 
        console.log(t.inputElements.file);

        this.inputElements.file.addEventListener('change', function(){
            console.log(t.inputElements.file);
            t.handleFiles(t.inputElements.file.files)   
        });
        rivets.bind(
            this.inputElements.options , // bind to the element with id "colorForm"
            {
                data: this.data // add the data object so we can reference it in our template
            }
        );
    }

    update() {
    }

    render() {
    //   gProcessor.setJsCad(getSourceFromEditor());
    }

    handleFiles(files){
        console.log(files);
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            var reader = new FileReader();

            reader.addEventListener("load", function () {
                console.log(OpenJsCad);
                var worker = OpenJsCad.createConversionWorker();
                //var u = gProcessor.baseurl;
                
                worker.postMessage({baseurl: '', source: reader.result, filename: files[0].name, cache: true});
          
            }, false);
            
            if(file.name.match(/\.(stl|gcode)$/)) { // FIXME how to determine?
                reader.readAsBinaryString(file,"UTF-8");
            } else {
                reader.readAsText(file,"UTF-8");
            }

          }
    }	
}

/*

        var gProcessor = null; // required by OpenJScad.org

        var fileInput = document.querySelector('input[name="upload"]');

        function appendModel(){
            handleFiles(fileInput.files);
        }

        fileInput.addEventListener('change', appendModel);

        function handleFiles(files) {
          for (var i = 0; i < files.length; i++) {
            var file = files[i];
            var reader = new FileReader();

            reader.addEventListener("load", function () {

                var worker = OpenJsCad.createConversionWorker();
                var u = gProcessor.baseurl;
                
                worker.postMessage({baseurl: u, source: reader.result, filename: files[0].name, cache: true});
           
            }, false);
            
            if(file.name.match(/\.(stl|gcode)$/)) { // FIXME how to determine?
                reader.readAsBinaryString(file,"UTF-8");
            } else {
                reader.readAsText(file,"UTF-8");
            }

          }
        }

        function loadProcessor() {
            gProcessor = new OpenJsCad.Processor(document.getElementById("viewerContext"));
            setUpEditor();
        }
//gProcessor.setJsCad(getSourceFromEditor(),"example.jscad");
/*
    gProcessor.setJsCad(getSourceFromEditor());
}
*/

/*

//refresh
gProcessor.setJsCad(gEditor.getValue());

//save string to points
let pointString = getSourceFromEditor().match(/points: \[[^]*\polygons\:/)[0];

let points = eval("p=["+pointString.substring(10,pointString.length-13)+"]");

//max radius
Math.max.apply(0, p.map( elt => { return elt[0]*elt[0] + elt[1]*elt[1]; }));

//max x
Math.min.apply(0, p.map( elt => { return elt[0]; }));

*/