import axios from 'axios'

const AxiosPublic=axios.create({
    baseURL:"https://one-editor-teal.vercel.app/api/"
})

export default AxiosPublic;