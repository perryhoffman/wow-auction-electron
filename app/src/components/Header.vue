<template>
    <div class="ui small borderless menu menu--header">
        <div class="ui container">
            <a href="#" class="header item">
                <img class="logo" src="../assets/logo.png">
                AUTOTIONEER
            </a>
            <div class="right menu">
                <div class="item">
                    <div class="ui orange button">Auto Buy</div>

                    <div class="ui purple button">Inventory</div>

                    <div class="ui labeled button" tabindex="0">
                    <div class="ui primary button small">Auction</div>
                    <a class="ui basic left pointing label">
                        0
                    </a>
                    </div>

                    <div class="ui labeled button" tabindex="0">
                    <div class="ui teal button small">History</div>
                    <a class="ui basic left pointing label">
                        0
                    </a>
                    </div>
                    <div class="ui primary button">Track an Item</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
    .ui.menu--header .item img.logo {
        margin-right: 1.5em;
    }

    .ui.menu--header .item .button+ .button {
        margin-left: 1em;
    }
</style>