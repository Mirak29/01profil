let query1 = `
{
    user {
        id
        login
        email
        campus
        lastName
        firstName
        auditRatio
        totalUp
        totalDown
        skill:transactions (
        order_by: [{ type: desc }, { amount: desc }]
        distinct_on: [type]
        where: { 
          type: { _like: "skill_%" }
        },
      ) 
      { 
        type
        amount
      }
      audited:audits(
        where:{
          grade:{_is_null:false},
        }
        ){
        grade
      }
    }
    allxp: transaction (
    order_by: [{ createdAt: desc }]
    where: { 
      event: { object: { type: { _eq:"module" } } } 
      type: { _eq: "xp" }
    }) 
    { 
      type
      amount
      path
      createdAt
      object{
        name
      }
    }
    level: transaction(
      order_by:{amount:desc}
        limit:1
        where: {
          type: { _eq: "level" },
          _or:{event:{object:{name:{_eq:"Div 01"}}}}
        }
        ) {
        amount 
    }
}
`
export let query = `{ user {
    id
    login
    email
    campus
    lastName
    firstName
    auditRatio
    totalUp
    totalDown
    transactions (
      order_by: [{ type: desc }, { amount: desc }]
      distinct_on: [type]
      where: { 
        type: { _like: "skill_%" }
      },
    ) 
    { 
      skill:type
      amount
    }
    audited:audits(where:{grade:{_is_null:false},
    }){ grade}
  }
      totalXp: transaction_aggregate(
    where: {
      event: { object: { type: { _eq:"module" } } }
      type: { _eq: "xp" }
    }
  ) { aggregate { sum { amount } } }

xps: transaction(
  order_by: { amount: desc }
  limit:10
    where: {
      event: { object: { type: { _eq:"module" } } }
      type: { _eq: "xp" }
      object: {type: {_eq: "project"}}
    }
  ) {  
  object{
      name
        type
    }
  amount
    createdAt
} 

projects: transaction_aggregate(
    where: { transaction_type:{type:{_eq:"xp"}}
      object:{type :{ _eq:"project" }}
    }
)   { aggregate  { count } }
  
level: transaction(
    order_by:{amount:desc}
      limit:1
      where: {
        type: { _eq: "level" },
        _or:{event:{object:{name:{_eq:"Div 01"}}}}
      }
      ){ amount }
}` 

export async function HaveSession() {
    const graphqlQuery = {
        query: `{
            user{
                id
                login
            }
        }`
    };
    const requestConfig = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("user_token")}`
        },
        body: JSON.stringify(graphqlQuery),
    };
    return FetchData("https://learn.zone01dakar.sn/api/graphql-engine/v1/graphql", requestConfig)
        .then((response) => {
            if (response?.response?.data) {
                return true;
            }
            return false;
        })
        .catch((error) => {
            console.error(`Error during fetch: ${error}`);
            return false;
        });
}

export async function FetchData(url, config) {
    try {
        const response = await fetch(url, config);
        if (!response.ok) {
            const errorBody = await response.text();
            return {
                status: false,
                statusCode: response.status,
                statusText: response.statusText,
                errorBody: errorBody
            };
        }
        const data = await response.json();
        return { response: data, status: true };
    } catch (error) {
        return { status: false, error: error.message };
    }
}

export async function getUserData(){
    let graphqlQuery = {
        query: query
    }
    let config={
        method:"POST",
        headers:{
            "Authorization": `Bearer ${localStorage.getItem("user_token")}`
        },
        body: JSON.stringify(graphqlQuery),
    }
    return  FetchData("https://learn.zone01dakar.sn/api/graphql-engine/v1/graphql",config).then(async (response)=>{
        if (response?.response?.data) {
            return  {response:response?.response?.data,status:true};
        }
        return  {response:null,status:false};
    }).catch((err)=>{
        console.log(err);
        return  {response:null,status:false};
    })
}