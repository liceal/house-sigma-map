<template>
  <div>
    <MapHeader
      @searchEnter="searchEnter"
      @filterApply="filterApply"
      @back="back"
    />
    <MapView />
  </div>

  <!-- searchValue {{ searchValue }}
  <br />
  filters {{ filterBlock.items[0].popup.data }} -->
</template>

<script>
import MapHeader from "./components/map-header.vue";
import MapView from "./views/map-view.vue";
import { ref, reactive, provide } from "vue";
import { useStore } from "@/store/map";
export default {
  name: "HouseMap",
  components: {
    MapHeader,
    MapView,
  },
  setup(props, ctx) {
    const mapStore = useStore();

    const searchValue = ref("");
    provide("searchValue", searchValue);

    const filterBlock = reactive({
      items: [
        {
          field: "filters",
          title: "filters",
          popup: {
            title: "Filters",
            visible: false,
            items: [
              {
                field: "Bedrooms",
                title: "Bedrooms",
                itemRender: {
                  name: "checkbox",
                  props: {
                    multiple: true,
                    options: [
                      { label: "Any", value: "" },
                      { label: "0", value: "0" },
                      { label: "1", value: "1" },
                      { label: "2", value: "2" },
                      { label: "3", value: "3" },
                      { label: "4", value: "4" },
                      { label: "5+", value: "5+" },
                    ],
                  },
                },
              },
              {
                field: "Bathroom",
                title: "Bathroom",
                itemRender: {
                  name: "checkbox",
                  props: {
                    options: [
                      { label: "Any", value: "" },
                      { label: "1+", value: "1+" },
                      { label: "2+", value: "2+" },
                      { label: "3+", value: "3+" },
                      { label: "4+", value: "4+" },
                      { label: "5+", value: "5+" },
                    ],
                  },
                },
              },
              {
                field: "GarageParking",
                title: "Garage/Parking",
                itemRender: {
                  name: "checkbox",
                  props: {
                    options: [
                      { label: "Any", value: "" },
                      { label: "1+", value: "1+" },
                      { label: "2+", value: "2+" },
                      { label: "3+", value: "3+" },
                      { label: "4+", value: "4+" },
                      { label: "5+", value: "5+" },
                    ],
                  },
                },
              },
            ],
            data: mapStore.getLocalStorageFilters() || {
              Bedrooms: [],
              Bathroom: "",
              GarageParking: "",
            },
          },
        },
      ],
      data: { filters: false },
    });
    provide("filterBlock", filterBlock);

    const searchEnter = (val) => {
      console.log("search", val, searchValue.value);
    };

    const back = () => {
      console.log("back");
    };

    const filterApply = (val) => {
      // console.log(12312);
      // console.log("filterApply", val, filterBlock);
      // filterBlock.data =
      mapStore.setFilters(val);
    };
    return { searchValue, filterBlock, searchEnter, filterApply, back };
  },
};
</script>

<style></style>
