const CreateMarker = (item) => {
  return {
    position: {
      lat: item.y,
      lng: item.x,
    },
    content: item.place_name,
    place_url: item.place_url,
  };
}
export default CreateMarker