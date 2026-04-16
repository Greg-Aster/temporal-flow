<script>
import SharedFriendManager from '@temporal-flow/blog-core/components/svelte/friends/FriendManager.svelte'

export let savedFriends = []
</script>

<SharedFriendManager {savedFriends} />
