import type { BuildingSize, OperatingAreaSize } from '$types/types';

type ConfigType = {
	[buildingType: string]: {
		buildingSize: BuildingSize;
		operatingAreaSize?: OperatingAreaSize;
	};
};

const config: ConfigType = {
	forester: {
		buildingSize: 3,
		operatingAreaSize: 8
	}
};

export default config;
