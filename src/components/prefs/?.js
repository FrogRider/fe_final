const items = [
  ...Array(77)
].map( ( item, index ) => {
  return {
    id: index,
    content: `item-${ index }`,
  }
} );

console.log( items );

const filterItems = (items, pageId, itemsPerPage = 8) => 
  items.filter( (item, index) => {
    const page = Math.floor(index / itemsPerPage);
    return page === pageId;
  } );

console.log( filterItems(items, 10) );

// first prev i-2 i-1 i i+1 i+2 next last
const params = new URLSearchParams( location.search ) 
console.log( location );
console.log( +params.get('page') );
console.log( String(params) );

const pagesList = (items, pageId, itemsPerPage = 8, variance = 2) => {
  pageId = Math.max(0, +pageId || 0);
  itemsPerPage = Math.max(1, +itemsPerPage || 0);
  const pagesAmount = Math.ceil(items.length / itemsPerPage); //кол-во страниц при заданной пагинации
  const pageIdFirst = 0;
  const pageIdLast = Math.max(pageIdFirst, pagesAmount - 1);
  const pageIdNext = Math.min(pageId + 1, pageIdLast);
  const pageIdPrev = Math.max(pageId - 1, pageIdFirst);
  const pages = [ ...Array( 1 + 2*variance ) ].map( (item, index) => {
    return index - variance + pageId;
  } ).filter( (page) => {
    return pageIdFirst <= page && page <= pageIdLast;
  } ).map( page => {
    const params = new URLSearchParams( location.search );
    params.set('page', page);
    return {
      ...page===pageId ? { current: true } : {},
      link: `${ location.pathname }?${ params }`,
      text: `${ page + 1 }`,
    }
  } );
  const result = [];
  if (pageIdFirst < pageId) {
    const page = pageIdFirst;
    const params = new URLSearchParams( location.search );
    params.set('page', page);
    result.push({
      first: true,
      link: `${ location.pathname }?${ params }`,
      text: `${ page + 1 }`, // ???
    });
  }
  if (pageIdFirst < pageIdPrev) {
    const page = pageIdPrev;
    const params = new URLSearchParams( location.search );
    params.set('page', page);
    result.push({
      prev: true,
      link: `${ location.pathname }?${ params }`,
      text: `${ page + 1 }`, // ???
    });
  }
  result.push(...pages);
  if (pageIdNext < pageIdLast) {
    const page = pageIdNext;
    const params = new URLSearchParams( location.search );
    params.set('page', page);
    result.push({
      next: true,
      link: `${ location.pathname }?${ params }`,
      text: `${ page + 1 }`, // ???
    });
  }
  if (pageId < pageIdLast) {
    const page = pageIdLast;
    const params = new URLSearchParams( location.search );
    params.set('page', page);
    result.push({
      last: true,
      link: `${ location.pathname }?${ params }`,
      text: `${ page + 1 }`, // ???
    });
  }
  return result;
}
console.log( pagesList( items, 8 ) );