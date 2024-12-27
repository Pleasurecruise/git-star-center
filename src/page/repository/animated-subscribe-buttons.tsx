import React from 'react';
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button.tsx";
import { Star as StarIcon, GitFork, Eye, UserPlus } from 'lucide-react';
import { useInteractionStore } from '@/store/interactionStore.tsx';
import { useAccountStore } from "@/store/userStore.tsx";

const SubscribeButtons: React.FC = () => {

    const { targetAccount } = useAccountStore();
    const {
        interaction,
        toggleStar,
        toggleFork,
        toggleWatch,
        toggleFollow,
    } = useInteractionStore();

    const handleClick = async (action: 'star' | 'fork' | 'watch' | 'follow') => {
        switch(action) {
            case 'star':
                await toggleStar();
                break;
            case 'fork':
                await toggleFork();
                break;
            case 'watch':
                await toggleWatch();
                break;
            case 'follow':
                await toggleFollow(targetAccount.username);
                break;
            default:
                break;
        }

        const defaults = {
            spread: 360,
            ticks: 50,
            gravity: 0,
            decay: 0.94,
            startVelocity: 30,
            colors: ["#FFE400", "#FFBD00", "#E89400", "#FFCA6C", "#FDFFB8"],
        };
        const shoot = () => {
            confetti({
                ...defaults,
                particleCount: 40,
                scalar: 1.2,
                shapes: ["star"],
            });

            confetti({
                ...defaults,
                particleCount: 10,
                scalar: 0.75,
                shapes: ["circle"],
            });
        };

        setTimeout(shoot, 0);
        setTimeout(shoot, 100);
        setTimeout(shoot, 200);
    };

    return (
        <div className="flex space-x-4">
            <Button
                onClick={() => handleClick('star')}
                variant={interaction.isStar ? 'active' : 'default'}
                className="flex items-center space-x-2"
            >
                <StarIcon className="w-4 h-4" />
                <span>{interaction.isStar ? 'Unstar' : 'Star'}</span>
            </Button>

            <Button
                onClick={() => handleClick('fork')}
                variant={interaction.isFork ? 'active' : 'default'}
                className="flex items-center space-x-2"
            >
                <GitFork className="w-4 h-4" />
                <span>{interaction.isFork ? 'Unfork' : 'Fork'}</span>
            </Button>

            <Button
                onClick={() => handleClick('watch')}
                variant={interaction.isWatch ? 'active' : 'default'}
                className="flex items-center space-x-2"
            >
                <Eye className="w-4 h-4" />
                <span>{interaction.isWatch ? 'Unwatch' : 'Watch'}</span>
            </Button>

            <Button
                onClick={() => handleClick('follow')}
                variant={interaction.isFollow ? 'active' : 'default'}
                className="flex items-center space-x-2"
            >
                <UserPlus className="w-4 h-4" />
                <span>{interaction.isFollow ? 'Unfollow' : 'Follow'}</span>
            </Button>
        </div>
    );
};

export default SubscribeButtons;
