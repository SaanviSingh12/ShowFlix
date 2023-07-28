import React, { useState } from "react";

import "./style.scss";

const SwitchTabs = ({ data, onTabChange }) => {
    // Making state to keep track of item choosen and we are storing its index
    const [selectedTab, setSelectedTab] = useState(0);
    // To make effect from left to right
    const [left, setLeft] = useState(0);

    const activeTab = (tab, index) => {
        // left is a property in css to specify horizontal position of the elemnt
        setLeft(index * 100);
        setTimeout(() => {
            setSelectedTab(index);
        }, 300);

        // Method present in parent passed by props to make api call acc to element 
        onTabChange(tab, index);
    };

    return (
        <div className="switchingTabs">
            <div className="tabItems">
                {/* fetching the array element passed from its parent as data */}
                {data.map((tab, index) => (
                    <span
                        key={index}
                        className={`tabItem ${
                            selectedTab === index ? "active" : ""
                        }`}
                        onClick={() => activeTab(tab, index)}
                    >
                        {tab}
                    </span>
                ))}
                {/* For making the moving animation */}
                <span className="movingBg" style={{ left }} />
            </div>
        </div>
    );
};

export default SwitchTabs;