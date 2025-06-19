import React from 'react'
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarTrigger,
} from "@/components/ui/menubar"
import { Link } from 'react-router-dom';

const HeaderMenu = ({ onCountChange, onAverageChange, resetFilters }) => {
    const handleVoteClick = (range) => {
        if (onCountChange) {
            onCountChange(range);
        }
    };
    const handleAverageClick = (range) => {
        if (onAverageChange) {
            onAverageChange(range)
        }
    }
    return (
        <Menubar className={`mx-4 mb-6 bg-gray-[#182423]`}>
            <MenubarMenu>
                <Link to={'/'} >
                    <MenubarTrigger onClick={() => resetFilters()}>Home</MenubarTrigger>
                </Link>
            </MenubarMenu>
            <MenubarMenu >
                <MenubarTrigger>Vote Count</MenubarTrigger>
                <MenubarContent>
                    <MenubarItem onClick={() => handleVoteClick('all')}>All</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem onClick={() => handleVoteClick('1-500')}>1-500</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem onClick={() => handleVoteClick('501-1000')}>501-1000</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem onClick={() => handleVoteClick('1000+')}>1000+</MenubarItem>
                </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
                <MenubarTrigger>Vote Average</MenubarTrigger>
                <MenubarContent>
                    <MenubarItem onClick={() => handleAverageClick('all')}>All</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem onClick={() => handleAverageClick('1-5')}>1-5</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem onClick={() => handleAverageClick('5+')}>5+</MenubarItem>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    )
}

export default HeaderMenu
