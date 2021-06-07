import React, { useMemo } from "react";
import parseHtmlStr from "html-react-parser";
import { useEffect } from "react";
import { useRef } from "react";

// В качестве пропсов принимает:
// staticInfo - статическая информация, как правило в виде строки html, которая после преобразуется в реакт компонент, но так-же принимает и готовый реакт компонент;
// remain - массив из объектов типа {element: 'html-string', type: 'materialize-component*'}
// * для каждого типа своя обработка в хуке useState, например: collapsible

export const AdditionalInfo = (props) => {
    const shouldBeDynamic = !!props.remain;
    const initialState = useMemo(() => {
        return shouldBeDynamic
            ? {
                  status: true,
                  data: props.remain.map(({ element, type }, ind) => ({
                      type: type && type[0].toUpperCase() + type.slice(1),
                      element: typeof element === "string" ? parseHtmlStr(element) : element,
                  })),
              }
            : {
                  status: false,
                  data: null,
              };
    }, [shouldBeDynamic, props.remain]);

    const dynamicRef = useRef(null);

    const dynamicInfo = initialState.status ? (
        <div className="dynamic-info" ref={dynamicRef}>
            {initialState.data.map(({ element }, ind) => (
                <div key={ind}>{element}</div>
            ))}
        </div>
    ) : null;

    useEffect(() => {
        if (!shouldBeDynamic) return;

        const dynamicElements = Array.from(dynamicRef.current.children).map(
            (item) => item.children[0]
        );
        let instances = [];
        dynamicElements.forEach((elem, ind) => {
            let instance = window.M[initialState.data[ind].type].init(elem, { accordion: false });
            instances.push(instance);
        });
        return () => {
            instances.forEach((instance) => instance.destroy());
        };
    }, [dynamicRef, initialState, shouldBeDynamic]);

    const staticInfo =
        typeof props.staticInfo === "string" && props.staticInfo
            ? parseHtmlStr(props.staticInfo)
            : props.staticInfo;

    if (!staticInfo) return <></>;

    return (
        <div className="additional-info">
            <h4>Описание:</h4>
            {staticInfo}
            {dynamicInfo}
        </div>
    );
};
