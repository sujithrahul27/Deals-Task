
    console.log("before try block inital load");
    
        console.log("try block is running");
        ZOHO.embeddedApp.on("PageLoad",function(data){
            document.getElementById("result").innerText += "Loaded Succcesfully";
            console.log("page load works correct");
            console.log(data);
            ZOHO.CRM.API.getRecord({Entity:data.Entity,RecordID:data.EntityId})
            .then(function(response){
                console.log(response.data[0]);
                var contact = response.data[0];
                var tableBody = document.getElementById("table-body");
                for(const [key, value] of Object.entries(contact)) {
                    console.log("key : "+key);
                    console.log("value : "+value);
                    var row = document.createElement("tr");
                    var keyCell = document.createElement("td");
                    keyCell.textContent = key;
                    var valueCell = document.createElement("td");
                    
                    
                        valueCell.textContent = value || "N/A";
                    

                    row.append(keyCell);
                    row.append(valueCell);
                    tableBody.append(row);
                }
                

            }).catch(function(error){
                document.getElementById("err").innerText += error
            });
            console.log("promise has been skipped or neglecated");
        })
        console.log("no errors till init");
    ZOHO.embeddedApp.init();
        //console.log("try block executed sucesfull");
    

    
        //onsole.log("error has been ooccured");
    
    
    console.log("programm executed sucessfully");
