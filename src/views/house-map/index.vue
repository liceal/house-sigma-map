<template>
  <div>
    <MapHeader @searchEnter="searchEnter" @filterApply="filterApply" />
    <MapView />
  </div>

  searchValue {{ searchValue }}
  <br />
  filters {{ filterBlock.items[0].popup.data }}
</template>

<script>
import MapHeader from "./components/map-header.vue";
import MapView from "./views/map-view.vue";
import { ref, reactive, provide } from "vue";
export default {
  name: "HouseMap",
  components: {
    MapHeader,
    MapView,
  },
  setup(props, ctx) {
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
                      { label: "Any", value: "Any" },
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
                      { label: "Any", value: "Any" },
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
                      { label: "Any", value: "Any" },
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
            data: {
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

    const filterApply = (val) => {
      console.log("filter", val, filterBlock.data);
    };
    return { searchValue, filterBlock, searchEnter, filterApply };
  },
};
</script>

<style></style>
