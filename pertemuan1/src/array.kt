fun main() {
    val items = listOf("apple", "banana", "orange")
    var index = 0
    while (index < items.size) {
        println("item at $index is ${items[index]}")
        index++
    }
}