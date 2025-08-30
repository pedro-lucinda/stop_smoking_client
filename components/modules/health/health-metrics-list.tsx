"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import type { IHealth } from "services/api/types";
import { HealthMetricCard } from "./health-metric-card";

const META: {
  key: Exclude<keyof IHealth, "date">;
  name: string;
  desc: string;
}[] = [
  {
    key: "pulse_rate",
    name: "Pulse rate",
    desc: "Heart rate normalizes after quitting.",
  },
  {
    key: "oxygen_levels",
    name: "Oxygen levels",
    desc: "Blood oxygen improves as CO drops.",
  },
  {
    key: "carbon_monoxide_level",
    name: "Carbon monoxide",
    desc: "Toxic CO is cleared from blood.",
  },
  {
    key: "nicotine_expelled",
    name: "Nicotine expelled",
    desc: "Nicotine leaves the body over days.",
  },
  {
    key: "taste_and_smell",
    name: "Taste & smell",
    desc: "Receptors recover sensitivity.",
  },
  {
    key: "breathing",
    name: "Breathing",
    desc: "Airways relax and airflow improves.",
  },
  {
    key: "energy_levels",
    name: "Energy",
    desc: "Circulation and lung function boost energy.",
  },
  {
    key: "circulation",
    name: "Circulation",
    desc: "Blood flow and vessel function recover.",
  },
  {
    key: "gum_texture",
    name: "Gum texture",
    desc: "Gum health starts to restore.",
  },
  {
    key: "immunity_and_lung_function",
    name: "Immunity & lungs",
    desc: "Cilia repair and immunity rises.",
  },
  {
    key: "reduced_risk_of_heart_disease",
    name: "↓ Heart disease risk",
    desc: "Risk falls steadily over time.",
  },
  {
    key: "decreased_risk_of_lung_cancer",
    name: "↓ Lung cancer risk",
    desc: "Long-term decline in risk.",
  },
  {
    key: "decreased_risk_of_heart_attack",
    name: "↓ Heart attack risk",
    desc: "Short-term risk drops quickly.",
  },
  {
    key: "life_regained_in_hours",
    name: "Life regained",
    desc: "Estimated healthy time regained.",
  },
];

export function HealthMetricsList({ data }: { data: IHealth }) {
  const [displayAll, setDisplayAll] = useState(false);

  return (
    <section className="flex flex-col gap-5 w-full ">
      <h3 className="font-bold text-lg">Health Metrics</h3>
      <div className="flex flex-wrap  gap-3 ">
        {META.slice(0, displayAll ? META.length : 5).map(
          ({ key, name, desc }) => (
            <HealthMetricCard
              key={key}
              name={name}
              value={Number(data[key]) || 0}
              description={desc}
            />
          )
        )}
      </div>
      <Button
        onClick={() => setDisplayAll(!displayAll)}
        className="w-20 mx-auto text-green-800 hover:text-green-200 "
        variant="ghost"
        size="sm"
      >
        {displayAll ? "See Less" : "See More"}
      </Button>
    </section>
  );
}
