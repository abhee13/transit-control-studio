import { create } from "zustand";
type State={mode:"bus"|"rail";selectedRoutes:string[];showStops:boolean}; type Actions={setMode:(m:"bus"|"rail")=>void;toggleRoute:(id:string)=>void;setShowStops:(v:boolean)=>void};
export const useAppStore=create<State & Actions>(set=>({mode:"bus",selectedRoutes:[],showStops:true,setMode:m=>set({mode:m}),toggleRoute:id=>set(s=>({selectedRoutes:s.selectedRoutes.includes(id)?s.selectedRoutes.filter(r=>r!==id):[...s.selectedRoutes,id]})),setShowStops:v=>set({showStops:v})}));
