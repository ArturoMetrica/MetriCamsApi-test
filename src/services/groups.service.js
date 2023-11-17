const _ = require('lodash')

class GroupsService {
	findChildren(g, groups) {
		return {
			...g,
			children: groups
				.filter((c) => c.parentId === g.id)
				.map((e) => this.findChildren(e, groups)),
		}
	}

	tree(groups, rootId = null) {
		const rootGroup = groups.find((g) => g.parentId === rootId)
		if (!rootGroup) return multiTree(groups)
		return findChildren(rootGroup || {}, groups)
	}

	multiTree(groups) {
		const roots = groups.filter(
			(g) => !groups.map((g) => g.id).includes(g.parentId)
		)
		const trees = roots.map((rootGroup) =>
			this.findChildren(rootGroup || {}, groups)
		)
		return trees
	}

	flatTree(tree) {
		const children = tree && tree.children && tree.children.map((c) => c)
		const group = { ...tree, children: undefined }
		return [group, ...this.flatAllFromTrees(children)]
	}

	flatAllFromTrees(trees) {
		if (!trees || !Array.isArray(trees)) return []
		const flatTreeLevel = _.flattenDeep(
			trees.map((tree) => {
				const flattedTree = this.flatTree(tree)
				return flattedTree
			})
		)
		return flatTreeLevel
	}

	flatFromMultiTree(trees, parents) {
		const fullGroups = this.flatAllFromTrees(trees)
		const toFindParents = parents || fullGroups.map((e) => e.id)
		const roots = fullGroups.filter((g) => toFindParents.includes(g.id))

		const flatten = roots.map((rootGroup) =>
			this.findChildrenFlat(rootGroup || {}, fullGroups)
		)

		return _.flattenDeep(flatten)
	}

	findChildrenFlat(g, groups) {
		return [
			g,
			...groups
				.filter((c) => c.parentId === g.id)
				.map((e) => this.findChildrenFlat(e, groups)),
		]
	}
}

module.exports = new GroupsService()

/********************* Propiedad de Métrica Móvil SA de CV **************************/