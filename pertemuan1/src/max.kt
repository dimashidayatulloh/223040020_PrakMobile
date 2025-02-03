fun main() {
    val a = 10
    val b = 90
    val c = max(a, b)
    val d = if (a > b) a else b
    println(c)
    println(d)
}

fun max (a:Int,b:Int):Int{
    if (a>b) {
        return a
    } else {
        return b
    }
}