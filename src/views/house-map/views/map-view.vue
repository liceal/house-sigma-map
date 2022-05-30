<template>
  <GoogleMap
    api-key="AIzaSyA1Krb9T9-F1KMysusQqc3b_Hk6YRL-0YU"
    class="google-map"
    :center="getMapCenter"
    :zoom="13"
    @click="googleMapClick"
  >
    <!-- <Marker :options="{ position: center }" />
    <Marker :options="{ position: center1 }" /> -->
    <Marker
      v-for="(map, key) in getMapData"
      :key="map.id || key"
      :options="map"
      @click="markerClick"
    >
      <InfoWindow ref="infoWindowRefs">
        <p>
          <label>up date:</label>
          {{ map.info.up_date }}
        </p>
        <p>
          <label>price:</label>
          {{ map.info.price }}
        </p>
        <p>
          <label>status:</label>
          {{ map.info.status }}
        </p>
        <img :src="map.info.photo" class="map-img" />
      </InfoWindow>
    </Marker>
  </GoogleMap>
</template>

<script>
import { GoogleMap, Marker, InfoWindow } from "vue3-google-map";
import { computed, ref } from "vue";
import { mapStore } from "@/store/map";
export default {
  name: "MapView",
  components: { GoogleMap, Marker, InfoWindow },
  setup() {
    const maper = mapStore();

    const infoWindowRefs = ref([]);

    const DefaultCenter = { lat: 49.2238816, lng: -122.9110533 }; //默认中心点

    const mapData = [
      {
        id: "6zqW7dGN9Npy5eZE",
        up_date: "2021-12-22",
        price: "599000",
        label: "M 599K",
        house_prop: {
          bedroom: 1,
          bathroom: 0,
          sqft: 111,
        },
        address: "4 - 1182 7TH AVENUE W",
        location: { lat: 49.2238816, lon: -122.9110533 },
        photo:
          "https://cache-w11.housesigma.com/file/pix-rebgv/262658608/acac0_1.jpg?1dcd5682",
        status: "sale",
      },
      {
        id: "bqB176WevD63ZajD",
        up_date: "2021-12-08",
        price: "90955",
        label: "A 91K",
        house_prop: {
          bedroom: 1,
          bathroom: 2,
          sqft: 134,
        },
        address: "102 - 825 15TH AVENUE W",
        location: { lat: 49.2036649, lon: -122.9084825 },
        photo:
          "https://cache-w11.housesigma.com/file/pix-rebgv/262659760/72ae7_1.jpg?f6104fbe",
        status: "sale",
      },
      {
        id: "jAXw7QwVR8bYQOzg",
        up_date: "2022-01-01",
        price: "22800",
        label: "M 22K",
        house_prop: {
          bedroom: 3,
          sqft: 111,
        },
        address: "606 - 587 7TH AVENUE W",
        location: { lat: 49.2079917, lon: -122.9140894 },
        photo:
          "https://cache-w13.housesigma.com/file/pix-rebgv/262658326/0f67c_1.jpg?51838036",
        status: "sold",
      },
      {
        id: "bEDRYagAB1P71VaB",
        up_date: "2021-12-16",
        price: "87000",
        label: "M 87K",
        house_prop: {
          bedroom: 3,
          bathroom: 2,
          sqft: 140,
        },
        address: "207 - 688 12TH AVENUE W",
        location: { lat: 49.2080851, lon: -122.9218253 },
        photo:
          "https://cache-w11.housesigma.com/file/pix-rebgv/262659228/302ab_1.jpg?4aae8dce",
        status: "sale",
      },
    ];

    const getMapCenter = computed(() => {
      if (getMapData.value.length > 0) {
        return getMapData.value[0].position;
      }
      return DefaultCenter;
    });

    const getMapData = computed(() => {
      let { Bathroom, Bedrooms, GarageParking } =
        maper.filterMap["filters"] || {}; //可能没有这个值

      function analysis(str) {
        if (!str) return null;
        let res = /(?<num>\d+)(?<direction>\W$)?/.exec(str);
        return res?.groups;
      }

      function judge(target, str) {
        const res = analysis(str);
        if (!res) {
          return true;
        }
        const { direction, num } = res;
        if (!direction) {
          return target === Number(num);
        }
        if (direction === "+") {
          return target >= Number(num);
        }
        if (direction === "-") {
          return target <= Number(num);
        }
      }

      function filterMap(house_prop) {
        const { bedroom, bathroom } = house_prop;
        if (Bedrooms && Bedrooms.length > 0) {
          if (!Bedrooms.some((v) => judge(bedroom, v))) {
            return false;
          }
        }
        if (!judge(bathroom, Bathroom)) {
          return false;
        }
        return true;
      }

      return mapData
        .filter((item) => filterMap(item.house_prop))
        .map((item) => {
          return {
            info: item,
            position: {
              lat: item.location.lat,
              lng: item.location.lon,
            },
            options: {
              label: {
                text: item.label,
                color: "#fff",
                className: "marker-label",
              },
              // icon: {
              //   url: "https://static.housesigma.com/app/assets/mapbox/dot-efb92b.png",
              // },
            },
          };
        });
    });

    const markerClick = () => {
      // infoWindowRefs.value.forEach((ref) => {
      //   ref.value.infoWindowRef.close();
      // });
    };

    const googleMapClick = () => {
      console.log(infoWindowRefs.value);
      infoWindowRefs.value.forEach((ref) => {
        // todo close window
        // ref.close();
      });
    };
    return {
      DefaultCenter,
      mapData,
      getMapData,
      getMapCenter,
      markerClick,
      googleMapClick,
      infoWindowRefs,
    };
  },
};
</script>

<style lang="scss" scoped>
::v-deep.google-map {
  width: 100%;
  height: calc(100vh - 93px);
  .marker-label {
    font-weight: 600;
    font-size: 14px;
    padding: 2px 7px;
    background-color: #28a3b3;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    border: 2px solid white;
    border-bottom: 0px;
    &::after {
      content: "";
      position: absolute;
      width: 14px;
      height: 14px;
      bottom: -9px;
      z-index: -1;
      transform: rotate(45deg);
      background-color: #28a3b3;
      border: 2px solid white;
    }
  }
}
.map-img {
  width: 200px;
  height: 200px;
  object-fit: contain;
}
</style>
