import axios from "axios"
import { useEffect, useState } from "react"
import { PATHS } from "./Contant"

const FETCH_TYPES = {
  CITIES: "FETCH_CITIES",
  DISTRICTS: "FETCH_DISTRICTS",
  WARDS: "FETCH_WARDS",
}

async function fetchLocationOptions(fetchType, locationId) {
  let url
  switch (fetchType) {
    case FETCH_TYPES.CITIES: {
      url = PATHS.CITIES
      break
    }
    case FETCH_TYPES.DISTRICTS: {
      url = `${PATHS.DISTRICTS}/${locationId}.json`
      break
    }
    case FETCH_TYPES.WARDS: {
      url = `${PATHS.WARDS}/${locationId}.json`
      break
    }
    default: {
      return []
    }
  }
  const locations = (await axios.get(url)).data["data"]
  return locations.map(({ id, name }) => ({ value: id, label: name }))
}

function useLocationForm() {
  const [state, setState] = useState({
    cityOptions: [],
    districtOptions: [],
    wardOptions: [],
    selectedCity: null,
    selectedDistrict: null,
    selectedWard: null,
  })

  const { selectedCity, selectedDistrict } = state

  useEffect(() => {
    ;(async function () {
      const options = await fetchLocationOptions(FETCH_TYPES.CITIES)
      setState({ ...state, cityOptions: options })
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    ;(async function () {
      if (!selectedCity) return
      const options = await fetchLocationOptions(
        FETCH_TYPES.DISTRICTS,
        selectedCity.value
      )
      setState({ ...state, districtOptions: options })
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCity])

  useEffect(() => {
    ;(async function () {
      if (!selectedDistrict) return
      const options = await fetchLocationOptions(
        FETCH_TYPES.WARDS,
        selectedDistrict.value
      )
      setState({ ...state, wardOptions: options })
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDistrict])

  function onCitySelect(option) {
    if (option !== selectedCity) {
      setState({
        ...state,
        districtOptions: [],
        wardOptions: [],
        selectedCity: option,
        selectedDistrict: null,
        selectedWard: null,
      })
    }
  }

  function onDistrictSelect(option) {
    if (option !== selectedDistrict) {
      setState({
        ...state,
        wardOptions: [],
        selectedDistrict: option,
        selectedWard: null,
      })
    }
  }

  function onWardSelect(option) {
    setState({ ...state, selectedWard: option })
  }

  return { state, onCitySelect, onDistrictSelect, onWardSelect }
}

export default useLocationForm
