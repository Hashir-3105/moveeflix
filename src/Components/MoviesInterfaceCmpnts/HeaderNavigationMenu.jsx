import React from 'react'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { Link } from 'react-router-dom'

const HeaderNavigationMenu = () => {
    return (
        <NavigationMenu className={`mx-4 mb-2 bg-gray-[#182423] text-black`}>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Vote Count </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <Link href="/docs">500</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link to={'/'}>1-500</Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                            <Link to={'/'}>501-1000</Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                            <Link to={'/'}>1000+</Link>
                        </NavigationMenuLink>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>All</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <NavigationMenuLink asChild>
                            <Link to={'/'}>1-5</Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                            <Link to={'/'}>5+</Link>
                        </NavigationMenuLink>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}

export default HeaderNavigationMenu
