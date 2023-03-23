import Select from "react-select"
import useLocationForm from "~/helper/useFormLocation"

export const AddressLocation = ({ loading, setLoading }) => {
  const { state, onCitySelect, onDistrictSelect, onWardSelect } =
    useLocationForm(false)
  const {
    cityOptions,
    districtOptions,
    wardOptions,
    selectedCity,
    selectedDistrict,
    selectedWard,
  } = state
  return (
    <div className="DeliveryAddress row">
      <div className="DeliveryAddressCity col col-md-6">
        <Select
          className="basic-single"
          classNamePrefix="select"
          placeholder="Tỉnh/thành phố ..."
          isClearable={true}
          isSearchable={true}
          isDisabled={cityOptions.length === 0}
          name="color"
          options={cityOptions}
          onChange={(option) => {
            onCitySelect(option)
          }}
          defaultInputValue={selectedCity}
        />
      </div>
      <div className="DeliveryAddressCity col col-md-6">
        <Select
          className="basic-single"
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
          }}
        />
      </div>
      <div className="DeliveryAddressCity col col-md-6">
        <Select
          className="basic-single"
          classNamePrefix="select"
          placeholder="Phường/xã ..."
          isDisabled={wardOptions.length === 0}
          isClearable={true}
          isSearchable={true}
          name="color"
          options={wardOptions}
          onChange={(option) => {
            onWardSelect(option)
          }}
        />
      </div>
      <div className="DeliveryAddressCity col col-md-6">
        <input type="text" placeholder="Số nhà / tên đường ..." />
      </div>
    </div>
  )
}
