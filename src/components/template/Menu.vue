<template>
  <aside class="menu" v-show="isMenuVisible">
    <div class="menu-filter">
      <i class="fa fa-search fa-lg"></i>
      <input
        type="text"
        placeholder="Digite para filtrar..."
        v-model="treeFilter"
        class="filter-field"
      >
    </div>
    <Tree :data="treeData" :options="treeOptions" :filter="treeFilter" ref="tree">
      <span class="tree-text" slot-scope="{ node }">
        <template v-if="!node.data.icon">{{ node.text }}</template>

        <template v-else>
          <i :class="node.data.icon" style="color: rgb(152, 154, 156);"></i>
          <span class="viewer-item__key" style="margin-left: 20px;">{{ node.text }}</span>
        </template>
      </span>
    </Tree>
  </aside>
</template>

<script>
import { mapState } from 'vuex'
import Tree from 'liquor-tree'
import { baseApiUrl } from '@/global'
import axios from 'axios'

import { getRole, getPermition } from '@/config/permissions'

export default {
    name: 'Menu',
    components: { Tree },
    computed: mapState(['isMenuVisible']),
    data: function() {
        return {
            treeFilter: '',
            treeData: this.getTreeData(),
            treeOptions: {
                propertyNames: { text: 'name' },
                filter: { emptyText: 'Categoria não encontrada' },
            },
        }
    },
    methods: {
        getTreeData() {
            return [
                {
                    name: 'Dashboard',
                    id: 'home',
                    data: { icon: 'fa fa-home fa-lg' },
                    state: { visible: getRole('comum') },
                },
                {
                    name: 'Cadastro',
                    data: { icon: 'fa fa-download' },
                    state: { expanded: true },
                    children: [
                        {
                            id: 'HelloWorld',
                            name: 'Cliente',
                            icon: 'icone',
                            index: 'cliente',
                            state: { visible: getPermition('read_users') },
                        },
                    ],
                },
                {
                    id: 'adminPages',
                    name: 'Administração',
                    data: { icon: 'fa fa-cogs' },
                    state: { visible: getRole('administrator') },
                },
            ]
        },

        onNodeSelect(node) {
            console.log(node.id)
            this.$router.push({
                name: node.id,
                params: { id: node.id },
            })

            if (this.$mq === 'xs' || this.$mq === 'sm') {
                this.$store.commit('toggleMenu', false)
            }
        },
    },

    mounted() {
        this.$refs.tree.$on('node:selected', this.onNodeSelect)
    },
}
</script>

<style>
.menu {
    grid-area: menu;
    background: linear-gradient(to right, #232526, #414345);

    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
}

.menu a,
.menu a:hover {
    color: #fff;
    text-decoration: none;
}

.tree-anchor {
    color: #f2f2f2;
}

.menu .tree-node.selected > .tree-content,
.menu .tree-node .tree-content:hover {
    background-color: rgba(255, 255, 255, 0.2);
}

.tree-arrow.has-child {
    filter: brightness(2);
}

.menu .menu-filter {
    display: flex;
    justify-content: center;
    align-items: center;

    margin: 20px;
    padding-bottom: 8px;
    border-bottom: 1px solid #aaa;
}

.menu .menu-filter i {
    color: #aaa;
    margin-right: 10px;
}

.menu input {
    color: #ccc;
    font-size: 1.1rem;
    border: 0;
    outline: 0;
    width: 100%;
    background: transparent;
}

.tree-filter-empty {
    color: #ccc;
    font-size: 1.3rem;
    margin-left: 20px;
}

/* Margem entre o icone e text */
.viewer-item__prop {
    margin-left: 8px;
}
</style>
