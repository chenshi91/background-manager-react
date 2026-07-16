import { Modal, Switch, Table } from "antd";
import React,{type ComponentType} from "react";
import { switchWithAutoLoading } from "./switch"
import {modalWithAutoLoading} from "./modal"

// 重载签名区分两种入参
function antd_hoc(Comp: ComponentType<any>) {
   let comp_hoc:React.FC<any> 
  // 判断是否是Switch组件
  switch(Comp){
    case Switch :
        comp_hoc=switchWithAutoLoading
        break;
    case Table: 
        comp_hoc=Comp
        break;
    case Modal:
        comp_hoc=modalWithAutoLoading
        break;
    default :
        throw new Error("目前仅支持传入 antd Switch / Table");    
  }
  
  return comp_hoc
}

export const SwitchWithAutoLoading = antd_hoc(Switch);
export const ModalWithAutoLoading=antd_hoc(Modal)
