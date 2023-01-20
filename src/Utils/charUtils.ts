import { BarDataType, Todo } from "../Interfaces/Interfaces";

export const GCT = (data:Todo[],filtered:boolean): [BarDataType, Object]=> {      
    const label: number[] = [];
    const labelData:Number[] = [];  
    const map:any ={};
    let DTO ={
        
    } as BarDataType;
    let Options ={};

    if(filtered){  
        const titles: any[]=[];      
        data.forEach(el=>{            
            map[el.id]=  el.completed?1:0.1;      
            titles.push(el.title)       
        });        
        Object.entries(map).forEach(el=>{
            labelData.push(Number(el[1]));
            label.push(Number(el[0]));                
        }); 
        DTO = {
            labels: label,  
            datasets:[{
                label: "Tasks by User",
                data: labelData,
                backgroundColor: [
                    "rgba(75,192,192,1)",
                    "#ecf0f1",
                    "#50AF95",
                    "#f3ba2f",
                    "#2a71d0",
                  ],
                  borderColor: "black",
                  borderWidth: 2,
    
            }]
        };
        Options = {
            plugins: {
                title: {
                  display: true,
                  text: 'Bar Chart'
                },
                tooltip:{
                    callbacks: {
                        title: function(context:any){                            
                            return `Title: ${titles[context[0].dataIndex]}`
                        },
                        afterTitle: function(context:any){                            
                            return `-----------`
                        }
                    }
                }
              }
        };

    }


    else{        
        data.forEach(el=>{ 
            if(map[el.userId] === undefined){
                 map[el.userId]= 0;                     
            }
            if(el.completed) map[el.userId]+=1;
        });        
        Object.entries(map).forEach(el=>{
            labelData.push(Number(el[1]));
            label.push(Number(el[0]));                
        });
        DTO = {
            labels: label,  
            datasets:[{
                label: "Task completed by Users",
                data: labelData,
                backgroundColor: [
                    "rgba(75,192,192,1)",
                    "#ecf0f1",
                    "#50AF95",
                    "#f3ba2f",
                    "#2a71d0",
                  ],
                  borderColor: "black",
                  borderWidth: 2,
    
            }]
        };
        Options = {
            plugins: {
                title: {
                  display: true,
                  text: 'Bar Chart'
                },
                tooltip:{
                    callbacks: {
                       
                    }
                }
              }
        };                       
    }
        
    console.log('we deliver this',[DTO,Options]);
    return [DTO, Options];
}