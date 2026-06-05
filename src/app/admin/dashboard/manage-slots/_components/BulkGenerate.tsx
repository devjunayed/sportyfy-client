"use client";

import Button from "@/components/UI/Button";
import { useGetFacilitiesQuery } from "../../../../../redux/api/dashboard/facilityApi";
import { TFacility } from "../../../../../types/facility.type";
import { useState } from "react";
import {
  RiAiGenerate,
  RiCheckboxMultipleLine,
  RiDeleteBin5Line,
} from "react-icons/ri";
import { toast } from "sonner";

const inputClass =
  "h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200";

type FacilityOption = {
  label: string;
  value: string;
};

const BulkGenerate = () => {
  const { data: facilitiesData } = useGetFacilitiesQuery("");
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<[string, string]>(["", ""]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [slotInterval, setSlotInterval] = useState<number>(60);

  const facilityNames: FacilityOption[] =
    facilitiesData?.data?.map((facility: TFacility) => ({
      label: facility.name,
      value: facility._id || "",
    })) || [];

  const handleFacilityChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedFacilities(
      Array.from(event.target.selectedOptions).map((option) => option.value),
    );
  };

  const handleSubmit = () => {
    if (
      !dateRange[0] ||
      !dateRange[1] ||
      selectedFacilities.length === 0 ||
      !startTime ||
      !endTime
    ) {
      toast.error("Please fill out all fields before generating.");
      return;
    }

    const payload = {
      dateRange,
      facilities: selectedFacilities,
      startTime,
      endTime,
      slotInterval,
    };

    console.log("Generated Bulk Slot Payload:", payload);
    toast.success("Bulk slot payload generated");
  };

  return (
    <div className="space-y-5">
      <section>
        <h2 className="mb-3 border-b border-slate-200 pb-2 font-semibold text-slate-900">
          Choose Range
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="grid gap-2 text-sm text-slate-700">
            <span>Start Date</span>
            <input
              type="date"
              className={inputClass}
              value={dateRange[0]}
              onChange={(event) =>
                setDateRange([event.target.value, dateRange[1]])
              }
            />
          </label>
          <label className="grid gap-2 text-sm text-slate-700">
            <span>End Date</span>
            <input
              type="date"
              className={inputClass}
              value={dateRange[1]}
              onChange={(event) =>
                setDateRange([dateRange[0], event.target.value])
              }
            />
          </label>
        </div>
      </section>

      <section>
        <h2 className="mb-3 border-b border-slate-200 pb-2 font-semibold text-slate-900">
          Choose Facility
        </h2>
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start">
          <select
            multiple
            className="min-h-32 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
            value={selectedFacilities}
            onChange={handleFacilityChange}
          >
            {facilityNames.map((facility) => (
              <option key={facility.value} value={facility.value}>
                {facility.label}
              </option>
            ))}
          </select>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setSelectedFacilities([])}
            >
              <RiDeleteBin5Line /> Clear All
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                setSelectedFacilities(facilityNames.map((facility) => facility.value))
              }
            >
              <RiCheckboxMultipleLine /> Choose All
            </Button>
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-3 border-b border-slate-200 pb-2 font-semibold text-slate-900">
          Enter Start and End Time
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            type="time"
            className={inputClass}
            value={startTime}
            onChange={(event) => setStartTime(event.target.value)}
          />
          <input
            type="time"
            className={inputClass}
            value={endTime}
            onChange={(event) => setEndTime(event.target.value)}
          />
        </div>
      </section>

      <section>
        <h2 className="mb-3 border-b border-slate-200 pb-2 font-semibold text-slate-900">
          Slot Interval
        </h2>
        <select
          className={inputClass}
          value={slotInterval}
          onChange={(event) => setSlotInterval(Number(event.target.value))}
        >
          <option value={60}>1 hour</option>
          <option value={120}>2 hours</option>
          <option value={180}>3 hours</option>
          <option value={240}>4 hours</option>
        </select>
      </section>

      <div className="flex justify-center border-t border-slate-200 pt-4">
        <Button type="button" onClick={handleSubmit}>
          <RiAiGenerate /> Generate
        </Button>
      </div>
    </div>
  );
};

export default BulkGenerate;
