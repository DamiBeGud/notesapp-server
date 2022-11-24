const express = require('express')
const { stringify } = require('querystring')


const app = express()
const port = 8080

app.use(express.json())
const users =[]
const posts = []
let calendartemplate = {id:'userid',
                          dates:[
                            {day: '',
                             month: '',
                             year:'',
                             data:{
                                title:'',
                                text:''
                             }
                            }
                          ]
}


const calendar = []
let response

function createCalendar(){
    let i
    while(i<365){
        let d = 1
        let m = 1
        
        calendartemplate= {id:'userid',
        dates:[
          {day: `${stringify(d)}`,
           month: `${stringify(m)}`,
           year:'2022',
           data:{
              title:'',
              text:''
           }
          }
        ]
        }

        calendar.push(calendartemplate)
        
        if(d === 31){
            d = 0
            m++
            i++
        }
        d++
        i++

    }
}

const a = (req, res, next)=>{
    const data = req.body
    const findUser = users.filter(user => user.email === data.email)
    findUser.length === 0 ? response=true:response=false 
    response===true? users.push(data): console.log('email already exists')
    console.log(users)
    res.json({response})
    next()
}
const b= (req, res, next)=>{
    const data = req.body
    const {email, password} = data
    const findUser = users.filter(user => user.email === data.email && user.password === data.password)
    console.log(findUser)
    findUser.length === 0 ? response={success:false}:response={success:true, url:`${findUser[0].id}`}
    response===true? console.log('user exists'): console.log('user does NOT exist')
    res.json({response})
    next()
}



app.post('/register',[a], (req, res, next)=>{

})
app.post('/',[b],(req, res, next)=>{

})
app.get('/user/:userId',(req, res)=>{
    const  userId  = req.params
    const findUser = users.filter(
        (user) => user.id === userId.userId
      )
      if (findUser.length === 0) {
        console.log(findUser)
        return res.status(404).send('User does not Exist')
      }
      console.log(findUser)
      const userContent = posts.filter(post => post.userId === userId.userId)
      return res.json({findUser, userContent})
})

app.post('/user/:userId', (req,res)=>{
    const data = req.body
    posts.push(data)
    console.log(posts)
    res.status(200).send(true)
})


app.listen(8080, (port)=>{
    console.log(`Server is listening on port 8080....`)
})