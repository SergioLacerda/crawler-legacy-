import rp from 'request-promise'

const getExternalSite = (url) => {
	return rp(url).then(function(htmlString){ return htmlString.split('\n') })
				  .catch(function(err){})
};

export { getExternalSite }