/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import Select from "react-select"
import useLocationForm from "~/helper/useFormLocation"

export const AddressLocation = ({ locationRef, setAddress, error = {} }) => {
  const { state, onCitySelect, onDistrictSelect, onWardSelect } =
    useLocationForm(false)
  const {
    cityOptions,
    districtOptions,
    wardOptions,
    selectedCity,
    selectedDistrict,
    // selectedWard,
  } = state
  const [add, setAdd] = useState({
    city: "",
    district: "",
    ward: "",
    location: "",
  })
  const { city, district, ward, location } = add

  useEffect(() => {
    setAddress(add)
  }, [district, city, ward, location])
  return (
    <div className="DeliveryAddress row" ref={locationRef}>
      <div className="DeliveryAddressCity col col-md-6">
        <Select
          className={error.city ? "basic-single FailBorder" : "basic-single"}
          classNamePrefix="select"
          placeholder="Tỉnh/thành phố ..."
          isClearable={true}
          isSearchable={true}
          isDisabled={cityOptions.length === 0}
          name="color"
          options={cityOptions}
          onChange={(option) => {
            onCitySelect(option)
            setAdd({ city: option.label, district: "", ward: "" })
          }}
          defaultInputValue={selectedCity}
        />
        {error.city && <p className="ErrorFail FailSelect">{error.city}</p>}
      </div>
      <div className="DeliveryAddressCity col col-md-6">
        <Select
          className={
            error.district ? "basic-single FailBorder" : "basic-single"
          }
          classNamePrefix="select"
          placeholder="Quận/huyện ..."
          isDisabled={districtOptions.length === 0}
          isClearable={true}
          isSearchable={true}
          name="color"
          options={districtOptions}
          defaultInputValue={selectedDistrict}
          onChange={(option) => {
            onDistrictSelect(option)
            setAdd({ ...add, district: option.label, ward: "" })
          }}
        />
        {error.district && (
          <p className="ErrorFail FailSelect">{error.district}</p>
        )}
      </div>
      <div className="DeliveryAddressCity col col-md-6">
        <Select
          className={error.ward ? "basic-single FailBorder" : "basic-single"}
          classNamePrefix="select"
          placeholder="Phường/xã ..."
          isDisabled={wardOptions.length === 0}
          isClearable={true}
          isSearchable={true}
          name="color"
          options={wardOptions}
          onChange={(option) => {
            onWardSelect(option)
            setAdd({ ...add, ward: option.label, location: "" })
          }}
        />
        {error.ward && <p className="ErrorFail FailSelect">{error.ward}</p>}
      </div>
      <div className="DeliveryAddressCity col col-md-6">
        <input
          type="text"
          className={
            error.location ? "basic-single FailBorder" : "basic-single"
          }
          placeholder="Số nhà / tên đường ..."
          onChange={(e) => {
            setAdd({ ...add, location: e.target.value })
          }}
        />
        {error.location && (
          <p className="ErrorFail FailSelect">{error.location}</p>
        )}
      </div>
    </div>
  )
}
