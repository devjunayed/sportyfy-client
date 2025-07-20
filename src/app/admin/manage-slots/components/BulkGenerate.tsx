"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, DatePicker, Select, TimePicker, message } from "antd";
import { useState } from "react";
import type { Dayjs } from "dayjs";
import { useGetFacilitiesQuery } from "../../../../redux/api/dashboard/facilityApi";
import { TFacility } from "../../../../types/facility.type";
import {
  RiAiGenerate,
  RiDeleteBin5Line,
  RiCheckboxMultipleLine,
} from "react-icons/ri";

const BulkGenerate = () => {
  const { RangePicker } = DatePicker;
  const { data: facilitiesData } = useGetFacilitiesQuery("");
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<
    [string | null, string | null] | null
  >(null);
  const [startTime, setStartTime] = useState<Dayjs | null>(null);
  const [endTime, setEndTime] = useState<Dayjs | null>(null);
  const [slotInterval, setSlotInterval] = useState<number>(60);

  const facilityNames =
    facilitiesData?.data?.map((facility: TFacility) => ({
      label: facility.name,
      value: facility._id,
    })) || [];

  const onRangeChange = (
    dates: null | (Dayjs | null)[],
    dateStrings: string[]
  ) => {
    if (dates) setDateRange([dateStrings[0], dateStrings[1]]);
    else setDateRange(null);
  };

  const handleSubmit = () => {
    if (
      !dateRange ||
      selectedFacilities.length === 0 ||
      !startTime ||
      !endTime
    ) {
      message.error("Please fill out all fields before generating.");
      return;
    }

    const payload = {
      dateRange,
      facilities: selectedFacilities,
      startTime: startTime.format("HH:mm"),
      endTime: endTime.format("HH:mm"),
      slotInterval,
    };

    console.log("Generated Bulk Slot Payload:", payload);
  };

  return (
    <div>
      {/* Choose Range */}
      <div>
        <h1 className="font-semibold py-2 border-b my-2">Choose Range</h1>
        <RangePicker className="reset" onChange={onRangeChange} />
      </div>

      {/* Choose Facility */}
      <div>
        <h1 className="font-semibold py-2 border-b my-2">Choose Facility</h1>
        <div className="text-white gap-2 flex justify-between items-center flex-wrap">
          <div className="flex w-full gap-2 items-center">
            <Select
              mode="multiple"
              allowClear
              className="w-full"
              placeholder="Please choose"
              value={selectedFacilities}
              onChange={(value) => setSelectedFacilities(value)}
              options={facilityNames}
            />
            <Button
              icon={<RiDeleteBin5Line />}
              onClick={() => setSelectedFacilities([])}
            >
              Clear All
            </Button>
            <Button
              icon={<RiCheckboxMultipleLine />}
              onClick={() =>
                setSelectedFacilities(facilityNames.map((f: any) => f.value))
              }
            >
              Choose All
            </Button>
          </div>
        </div>
      </div>

      {/* Choose Start time and end time */}
      <div className="mb-4 mt-4">
        <h1 className="font-semibold py-2 border-b my-2">
          Enter Start and End Time
        </h1>
        <div className="flex gap-8">
          <TimePicker
            format="HH:mm"
            placeholder="Start Time"
            onChange={(value) => setStartTime(value)}
          />
          <TimePicker
            format="HH:mm"
            placeholder="End Time"
            onChange={(value) => setEndTime(value)}
          />
        </div>
      </div>

      {/* Slot Interval */}
      <div className="mb-4 mt-4">
        <h1 className="font-semibold py-2 border-b my-2">Slot Interval</h1>
        <Select
          defaultValue={30}
          className="w-full"
          onChange={(value) => setSlotInterval(value)}
          options={[
            { label: "1 hour", value: 60 },
            { label: "2 hours", value: 120 },
            { label: "3 hours", value: 180 },
            { label: "4 hours", value: 240 },
          ]}
        />
      </div>
      {/* Generate button */}
      <div className="flex justify-center pt-4 border-t">
        <Button
          className="text-white bg-blue-600 hover:bg-blue-700"
          icon={<RiAiGenerate />}
          onClick={handleSubmit}
        >
          Generate
        </Button>
      </div>
    </div>
  );
};

export default BulkGenerate;
