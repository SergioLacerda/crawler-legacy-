import axios from 'axios'

const getExternalSite = (url) => 
	axios.get(url)
        .then(response => response.data.split('\n'))
        .catch(error => {
            console.error('Error fetching external site:', error)
            return []
        })

export { getExternalSite }
